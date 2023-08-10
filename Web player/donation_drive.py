import smartpy as sp

# A SmartPy module
@sp.module
def main():
    # A class of contracts
    class donation_draw(sp.Contract):
        def __init__(self):
            self.data = sp.record(
                players = {},
                ticket_cost = sp.tez(1),
                tickets_available = sp.nat(5),
                max_tickets = sp.nat(5),
            )
            
        @sp.entrypoint
        def buy_ticket(self):

            # Sanity checks
            assert self.data.tickets_available > 0, "NO_TICKETS_AVAILABLE"
            assert sp.amount >= self.data.ticket_cost, "INVALID_AMOUNT"

            # Storage updates
            self.data.players[sp.len(self.data.players)] = sp.sender
            self.data.tickets_available = sp.as_nat(self.data.tickets_available - 1)
    
            # Return extra tez balance to the sender
            extra_balance = sp.amount - self.data.ticket_cost
            if extra_balance > sp.mutez(0):
                sp.send(sp.sender, extra_balance)
            sp.emit(sp.record(owner=sp.sender),tag="TICKET_PURCHASED")

        @sp.entrypoint
        def end_game(self):
    
            # Sanity checks
            assert self.data.tickets_available == 0, "GAME_IS_YET_TO_END"
    
            # Pick a winner
            winner_id = sp.mod(sp.as_nat(sp.now - sp.timestamp(0)), self.data.max_tickets)
            winner_address = self.data.players[winner_id]
            reward_amount=sp.nat(1)

            # Send the reward to the winner
            sp.send(winner_address, sp.balance)
    
            # Reset the game
            self.data.players = {}
            self.data.tickets_available = self.data.max_tickets
            sp.emit(sp.record(winner=winner_address),tag="WINNER_ANNOUNCED")


# Tests
if "templates" not in __name__:
    @sp.add_test(name="donation_draw")
    def test():

        # create test scenario
        scenario = sp.test_scenario(main)
        scenario.h1("Donation draw Contract")

        # create user test accounts
        admin_ngo = sp.test_account("admin_ngo")
        ngo_player1 = sp.test_account("ngo_player1")
        ngo_player2 = sp.test_account("ngo_player2")
        ngo_player5 = sp.test_account("ngo_player5")
        ngo_player4 = sp.test_account("ngo_player4")
        ngo_player3 = sp.test_account("ngo_player3")

        # list accounts
        scenario.h1("Accounts")
        scenario.show([admin_ngo, ngo_player1, ngo_player2, ngo_player5, ngo_player4, ngo_player3])

        # originate smart contract
        donation_draw = main.donation_draw()
        scenario += donation_draw
        
        # buy_ticket
        scenario.h2("buy_ticket (valid test)")
        donation_draw.buy_ticket().run(amount = sp.tez(1), sender = ngo_player1)
        donation_draw.buy_ticket().run(amount = sp.tez(2), sender = ngo_player2)
        donation_draw.buy_ticket().run(amount = sp.tez(3), sender = ngo_player3)
        donation_draw.buy_ticket().run(amount = sp.tez(1), sender = ngo_player4)
        donation_draw.buy_ticket().run(amount = sp.tez(1), sender = ngo_player5)
    
        scenario.h2("buy_ticket (failure test)")
        donation_draw.buy_ticket().run(amount = sp.tez(1), sender = ngo_player1, valid = False)
    
        # end_game
        scenario.h2("end_game (valid test)")
        donation_draw.end_game().run(sender = admin_ngo, now = sp.timestamp(20))