# Deployed on ghostnet at address = "KT1JTQ3Af8CjkzA3V45hWHt5eZiwBCKJwpxN"

import smartpy as sp

@sp.module 
def main():
    class Stake(sp.Contract):
        def __init__(self,admin):
            
            self.data.organizer = admin
            self.data.games = sp.big_map()
            self.data.winners = sp.big_map()
        
        
        @sp.entrypoint
        def add_player1(self, uid):
            sp.cast(uid, sp.string)
            assert not self.data.games.contains(uid), "Game ID allready exist"
            assert sp.amount == sp.tez(5) , "Staked tokens should be 5 TEZ"
            
            # Initializing game 
            self.data.games[uid] = sp.record(
                player1 = sp.sender,
                player2 = sp.address("tz1burnburnburnburnburnburnburjAYjjX"),
                stake_balance  = sp.amount,
                stake_amount = sp.tez(5),
                game_result  = ""
            )

            sp.emit(sp.record(p1=sp.sender), tag="Game_Initiated_Player_1_added")

        @sp.entrypoint
        def add_player2(self, uid):
            sp.cast(uid, sp.string)
            assert self.data.games.contains(uid), "Game ID does not exist"
            game = self.data.games[uid]
            assert game.player2 == sp.address("tz1burnburnburnburnburnburnburjAYjjX"),"Player 2 already added"
            assert sp.amount == sp.tez(5) , "Staked tokens should be 5 TEZ"

            self.data.games[uid] = sp.record(
                player1 = game.player1, 
                player2 = sp.sender, 
                stake_balance =  game.stake_balance + sp.amount, 
                stake_amount = game.stake_amount,
                game_result  = ""
            )
            
            sp.emit(sp.record(p1=sp.sender), tag="Player_2_added")
            
        @sp.entrypoint
        def wingame(self, winner ,uid):
            assert sp.sender == self.data.organizer, "Only Organizer Can Endgame" 
            sp.cast(uid, sp.string)
            assert self.data.games.contains(uid), "Game ID does not exist"
            game = self.data.games[uid]
            win = sp.address("tz1burnburnburnburnburnburnburjAYjjX")
            if(winner == "0"):
                win = game.player1
            else:
                win = game.player2
            
            # Funds Distribution
            sp.send(sp.sender, sp.tez(1))
            sp.send(win ,game.stake_balance - sp.tez(1))

            if(self.data.winners.contains(win)):
                self.data.winners[win] = self.data.winners[win] + 1
            else: 
                self.data.winners[win] = 1
            

            self.data.games[uid] = sp.record(
                player1 = game.player1, 
                player2 = game.player2, 
                stake_balance =  sp.tez(0), 
                stake_amount = game.stake_amount,
                game_result  = "winner"
            )
            # Emmiting Event
            sp.emit(sp.record(game_Winner=win,game_id=uid),tag="WINNER_ANNOUNCED")     

        @sp.entrypoint
        def drawgame(self, uid):
            sp.cast(uid, sp.string)
            assert self.data.games.contains(uid), "Game ID does not exist"
            assert sp.sender == self.data.organizer, "Only Organizer Can Endgame" 
            game = self.data.games[uid]

            #Funds Distribution
            sp.send(self.data.organizer, sp.tez(1))
            game.stake_balance -= sp.tez(1)
            balance = sp.split_tokens(game.stake_balance, 50, 100)
            sp.send(game.player1 ,balance)
            sp.send(game.player2 ,balance)

            self.data.games[uid] = sp.record(
                player1 = game.player1, 
                player2 = game.player2, 
                stake_balance =  sp.tez(0), 
                stake_amount = game.stake_amount,
                game_result  = "Draw Match"
            )

            # Emmiting Event
            sp.emit(sp.record(message="Draw Match"),tag="Draw_Match")
        

# Test Cases Start here
@sp.add_test(name="Win")
def test():
    scenario = sp.test_scenario(main)
    scenario.h1("Win")

    # Getting Test account
    admin = sp.address("tz1gztg7ExVoksuZE5fyaZ65cmukj1WjpYBP")
    p1 = sp.test_account("Player1")
    p2 = sp.test_account("Player2")
    p3 = sp.test_account("Player3")
    p4 = sp.test_account("Player4")

    # Print Test accounts
    scenario.h2("Accounts")
    scenario.show([p1,p2,p3,p4])
    
    # originate smart contract
    c1 = main.Stake(admin)
    scenario += c1
    guid1 = sp.string("sdv13")
    guid2 = sp.string("adfae234")
    guid3 = sp.string("sdkavyuebvyu")
    guid4 = sp.string("ldkfkjviebfv")
    
    
    # Initiate Games
    scenario.h2("Simple Game 1 Initiation")
    c1.add_player1(guid1).run(sender=p1, amount=sp.tez(5))
    scenario.h2("Simple Game 2 Initiation")
    c1.add_player1(guid2).run(sender=p3, amount=sp.tez(5))
    scenario.h2("Simple Game 3 Initiation")
    c1.add_player1(guid3).run(sender=p1, amount=sp.tez(5))
    scenario.h2("Simple Game 4 Initiation")
    c1.add_player1(guid4).run(sender=p3, amount=sp.tez(5))

    #Adding players to games   
    scenario.h2("Adding Player 2 to Game 1")
    c1.add_player2(guid1).run(sender=p2, amount=sp.tez(5))
    scenario.h2("Adding Player 4 to Game 2")
    c1.add_player2(guid2).run(sender=p4, amount=sp.tez(5))
    scenario.h2("Adding Player 4 to Game 3")
    c1.add_player2(guid3).run(sender=p4, amount=sp.tez(5))
    scenario.h2("Adding Player 2 to Game 4")
    c1.add_player2(guid4).run(sender=p2, amount=sp.tez(5))

    #End Games
    scenario.h2("Game 1 Win")
    c1.wingame(sp.record(winner = "0",uid = guid1)).run(sender=admin)
    scenario.h2("Game 2 Win")
    c1.wingame(sp.record(winner = "1",uid = guid2)).run(sender=admin)
    scenario.h2("Game 3 Win")
    c1.wingame(sp.record(winner = "0",uid = guid3)).run(sender=admin)
    scenario.h2("Game 4 Draw")
    c1.drawgame(guid4).run(sender=admin)
