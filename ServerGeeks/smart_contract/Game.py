import smartpy as sp
# from sp.test_constants import alice, bob

@sp.module
def main():

    class Game(sp.Contract):

        def __init__(self):
            self.data.players = {}
            self.data.ticket_cost = sp.tez(1)
            self.data.players_avaliable = sp.nat(2)
            self.data.max_players = sp.nat(2)
            self.data.history = sp.cast(sp.big_map(), sp.big_map[sp.string, sp.record(
                    # player=sp.address,
                    # player2=sp.address,
                    # players=sp.record(),
                    stakeAmount=sp.mutez,
                    score=sp.nat,
                    winner=sp.address)])
            self.data.leaderboard = {}
            self.data.leaderboard_len = 0
            self.data.weeklyChallenges = {}
            self.data.challengeId = 0
            # self.operator = sp.test_account("admin").address

        @sp.entry_point
        def buy_ticket(self):
            assert self.data.players_avaliable > 0, "TICKETS_NOT_AVAILABLE"
            assert sp.amount > sp.tez(0), "INVALID_TICKET_PRICE"
            assert sp.amount < sp.tez(10), "INVALID_TICKET_PRICE"
            
            self.data.players[sp.sender] = sp.amount
            self.data.players_avaliable = sp.as_nat(self.data.players_avaliable - 1)
            
            extra_balance = sp.amount - sp.amount
            if extra_balance > sp.tez(0):
                sp.send(sp.sender, extra_balance)
        
        @sp.entrypoint
        def end_game(self, params):
            assert self.data.players_avaliable == 0, "GAME_IS_STILL_NOT_ENDED"
            # winner_id = sp.mod(sp.as_nat(sp.now - sp.timestamp(0)), self.data.max_players)
            # winner_address = self.data.players [winner_id]
            gameId = params.gameId
            winner_address = sp.sender
            sp.send (winner_address, sp.balance)
        
            self.data.history[gameId] = sp.record(
                stakeAmount = sp.balance,
                score = sp.as_nat(params.score),
                winner = winner_address,
            )
            if (self.data.leaderboard.contains(winner_address)):
                score = self.data.leaderboard[winner_address]["score"]
                wins = self.data.leaderboard[winner_address]["wins"]
                gamesPlayed = self.data.leaderboard[winner_address]["gamesPlayed"]
                
                self.data.leaderboard[winner_address] = {
                    "gamesPlayed": gamesPlayed + 1,
                    "score": sp.as_nat(params.score) + score,
                    "wins": wins + 1
                }
            else:
                self.data.leaderboard[winner_address] = {
                    "gamesPlayed":  sp.as_nat(1),
                    "score": sp.as_nat(params.score),
                    "wins": sp.as_nat(1)
                }
                self.data.leaderboard_len = self.data.leaderboard_len + 1
                
            self.data.players = {}
            self.data.players_avaliable = sp.nat (2)

        @sp.entrypoint
        def refund(self):
            winner_address = sp.sender
            sp.send (winner_address, sp.balance)
            self.data.players = {}
            self.data.players_avaliable = sp.nat (2)

        @sp.entrypoint
        def create_weekly_challenge(self, params):
            self.data.weeklyChallenges[self.data.challengeId] = sp.record(
                players = {},
                stake_amt = sp.tez(1),
                stake_bal = sp.tez(0),
                owner = sp.sender,
                leaderboard = {},
                startTime = sp.now,
                end_time = sp.timestamp(604800),
                game = params.game,
                ended = sp.nat(0)
            )
            self.data.challengeId = self.data.challengeId + 1

        @sp.entrypoint
        def enter_weekly_challenge(self, params):
            challengeID = params.challengeId
            challenge = self.data.weeklyChallenges[challengeID]
            
            assert not challenge.players.contains(sp.sender), "Already Participated"
            assert not challenge.ended == sp.nat(1), "Challenge Ended"
            
            challenge.players[sp.sender] = sp.now
            self.data.weeklyChallenges[params.challengeId] = sp.record(
                players = challenge.players,
                stake_amt = challenge.stake_amt,
                stake_bal = challenge.stake_bal + sp.tez(1),
                owner = challenge.owner,
                leaderboard = challenge.leaderboard,
                startTime = challenge.startTime,
                end_time = challenge.end_time,
                game = challenge.game,
                ended = challenge.ended
            )
            
        @sp.entrypoint
        def participated_weekly_challenge(self, params):
            challengeID = params.challengeId
            challenge = self.data.weeklyChallenges[challengeID]

            assert not challenge.leaderboard.contains(sp.sender), "Already Participated"
            assert not challenge.ended == sp.nat(1), "Challenge Ended"
            
            challenge.leaderboard[sp.sender] = params.score
            self.data.weeklyChallenges[params.challengeId] = sp.record(
                players = challenge.players,
                stake_amt = challenge.stake_amt,
                stake_bal = challenge.stake_bal + sp.tez(1),
                owner = challenge.owner,
                leaderboard = challenge.leaderboard,
                startTime = challenge.startTime,
                end_time = challenge.end_time,
                game = challenge.game,
                ended = challenge.ended
            )

        @sp.entrypoint
        def end_weekly_challenge(self, params):
            challengeID = params.challengeId
            challenge = self.data.weeklyChallenges[challengeID]

            assert sp.sender == challenge.owner, "Only Organizer Can End the Game"

            self.data.weeklyChallenges[params.challengeId] = sp.record(
                players = challenge.players,
                stake_amt = challenge.stake_amt,
                stake_bal = challenge.stake_bal + sp.tez(1),
                owner = challenge.owner,
                leaderboard = challenge.leaderboard,
                startTime = challenge.startTime,
                end_time = challenge.end_time,
                game = challenge.game,
                ended = sp.nat(1)
            )
        
@sp.add_test(name="Game")
def test():
     scenario = sp.test_scenario(main)
     scenario.h1("Game Contract")
     scenario.h2("Deploy Contract" )
     game = main.Game ()
     scenario += game
    
     admin = sp.test_account ("admin")
     bob = sp.test_account ( "bob" )
     test1 = sp.test_account ( "test1" )
     test2 = sp.test_account ( "test2" )
     test3 = sp.test_account ( "test3" )
     test4 = sp.test_account ( "test4" )
     scenario.h2( "Buy Ticket")

     # ticket_params = sp.record(ticket_price=sp.tez(3))
    
     game.buy_ticket().run(sender = admin, amount = sp.tez(9))
     game.buy_ticket() .run(sender = bob, amount = sp.tez(9))
     scenario.h2( "End Game" )
     # args = {winner:admin, roomID:"abc"}
     game.end_game(gameId = "abcde", score = 122) . run (sender = admin, now = sp.timestamp (13))

     game.buy_ticket().run(sender = admin, amount = sp.tez(9))
     game.buy_ticket() .run(sender = bob, amount = sp.tez(9))
     scenario.h2( "End Game" )
     # args = {winner:admin, roomID:"abc"}
     game.end_game(gameId = "abcdef", score = 122) . run (sender = bob, now = sp.timestamp (13))

     game.buy_ticket().run(sender = admin, amount = sp.tez(9))
     game.buy_ticket() .run(sender = bob, amount = sp.tez(9))
     scenario.h2( "End Game" )
     # args = {winner:admin, roomID:"abc"}
     game.end_game(gameId = "abcdefg", score = 100) . run (sender = admin, now = sp.timestamp (13))

     game.create_weekly_challenge(game = "sudodu") . run (sender = admin)
     game.enter_weekly_challenge(challengeId = 0) . run (sender = bob)
     game.participated_weekly_challenge(challengeId = 0, score = 1400) . run (sender = bob)
     game.enter_weekly_challenge(challengeId = 0) . run (sender = test1)
     game.enter_weekly_challenge(challengeId = 0) . run (sender = test2)
     game.participated_weekly_challenge(challengeId = 0, score = 900) . run (sender = test2)
     game.participated_weekly_challenge(challengeId = 0, score = 600) . run (sender = test1)

     game.create_weekly_challenge(game = "whac-a-mole") . run (sender = admin)
     game.enter_weekly_challenge(challengeId = 1) . run (sender = bob)
     game.participated_weekly_challenge(challengeId = 1, score = 1400) . run (sender = bob)
     game.enter_weekly_challenge(challengeId = 1) . run (sender = test1)
     game.enter_weekly_challenge(challengeId = 1) . run (sender = test2)
     game.enter_weekly_challenge(challengeId = 0) . run (sender = test3)
     game.participated_weekly_challenge(challengeId = 0, score = 1300) . run (sender = test3)
     game.participated_weekly_challenge(challengeId = 1, score = 900) . run (sender = test2)
     game.participated_weekly_challenge(challengeId = 1, score = 600) . run (sender = test1)

     game.end_weekly_challenge(challengeId = 0) . run (sender = admin)
     # game.enter_weekly_challenge(challengeId = 0) . run (sender = test4)
    
     # scenario.h2( "Refund" )
     # game.refund().run (sender = admin, now = sp.timestamp (13))
    