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
            self.data.history = {}

            # self.operator = sp.test_account("admin").address

        @sp.entry_point
        def buy_ticket(self):
            assert self.data.players_avaliable > 0, "TICKETS_NOT_AVAILABLE"
            assert sp.amount >= sp.tez (1), "INVALID AMOUNT" 
            self.data.players [sp.len (self.data.players) ] = sp.sender
            self.data.players_avaliable = sp.as_nat(self.data.players_avaliable - 1)
            extra_balance = sp.amount - self.data.ticket_cost
            if extra_balance > sp.tez (0):
                sp. send (sp. sender, extra_balance)
        
        @sp.entrypoint
        def end_game(self, params):
            assert self.data.players_avaliable == 0, "GAME_IS_STILL_NOT_ENDED"
            # winner_id = sp.mod(sp.as_nat(sp.now - sp.timestamp(0)), self.data.max_players)
            # winner_address = self.data.players [winner_id]
            winner_address = sp.sender
            sp.send (winner_address, sp.balance)
            self.data.history [sp.len (self.data.history)] = params
            self.data.players = {}
            self.data.players_avaliable = sp.nat (2)

@sp.add_test(name="Game")
def test():
     scenario = sp.test_scenario(main)
     scenario.h1("Game Contract")
     scenario.h2("Deploy Contract" )
     game = main.Game ( )
     scenario += game
    
     admin = sp.test_account ("admin")
     bob = sp.test_account ( "bob" )
     scenario.h2( "Buy Ticket")
     game.buy_ticket ().run(sender = admin, amount = sp.tez (1))
     game.buy_ticket() .run(sender = bob, amount = sp.tez (1))
     scenario.h2( "End Game" )
     # args = {winner:admin, roomID:"abc"}
     game.end_game(roomID=sp.pack("abc")) . run (sender = admin, now = sp.timestamp (13))
    