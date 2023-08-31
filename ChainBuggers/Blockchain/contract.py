 
import smartpy as sp
from utils import utils

# FA12 = sp.io.import_stored_contract("FA12")
# FA2 = sp.io.import_stored_contract("modifiedNFT")

# class NFT(FA2.FA2):
    # pass

@sp.module
def main():
    class TicketSell(sp.Contract):
        def _init_(self, admin, buyer):
            self.data.seat = {}
            self.data.ticket_cost = sp.tez(1)
            self.data.tickets_available = sp.nat(5)
            self.data.max_tickets = sp.nat(5)
            self.data.balances = {}
            self.data.admin = admin
            self.data.buyer = buyer

        @sp.private(with_storage="read-write")
        def increase_balance(self, x, amount):
            if self.data.balances.contains(x):
                self.data.balances[x] += amount
            else:
                self.data.balances[x] = amount

        @sp.private(with_storage="read-write")
        def decrease_balance(self, x, amount):
            b = self.data.balances[x] - amount
            assert b >= 0
            if b == 0:
                del self.data.balances[x]
            else:
                self.data.balances[x] = b

    
        @sp.entrypoint
        def buy_ticket(self):
            assert self.data.tickets_available > sp.nat(0), "TICKETS_NOT_AVAILABLE"
            assert sp.amount >= sp.tez(1), "INVALID AMOUNT"
            self.data.seat[sp.len(self.data.seat)] = sp.sender
            self.data.tickets_available = sp.as_nat(self.data.tickets_available - 1)
            extra_balance = sp.amount - self.data.ticket_cost
            if extra_balance > sp.tez(0):
                sp.send(sp.sender, extra_balance)


        @sp.entrypoint
        def transfer(self, params):
            self.decrease_balance(sp.record(x=sp.sender, amount=params.amount))
            self.increase_balance(sp.record(x=params.dest, amount=params.amount))


        @sp.entrypoint
        def mint(self, params):
            assert sp.sender == self.data.buyer
            self.increase_balance(sp.record(x=params.dest, amount=params.amount))

        # @sp.entrypoint
        # def mutez_transfer(self, contract, params):
        #     sp.verify(sp.sender == contract.data.administrator)
        #     sp.set_type(params.destination, sp.TAddress)
        #     sp.set_type(params.amount, sp.TMutez)
        #     sp.send(params.destination, params.amount)
    
        # @sp.entrypoint
        # def end_game(self):
        #     assert self.data.tickets_available == 0, "GAME_IS_NOT_ENDED"
        #     winner_id = sp.mod(sp.as_nat(sp.now - sp.timestamp(0)), self.data.max_tickets)
        #     winner_address = self.data.players[winner_id]
        #     sp.send(winner_address, sp.balance)
    
        #     self.data.players = {}
        #     self.data.tickets_available = sp.nat(5)


@sp.add_test(name="Contract")
def test():
    admin = sp.test_account("tz1WsmHMwt1JTsEc1DEqNbhWB517hTJGszNn").address
    buyer = sp.test_account("tz1ZmXmAesLSmLo93oN95noaDAfm7fAmeVRp").address
    scenario = sp.test_scenario(main)
    scenario.h1("Ticket Sell Contract")
    sale = main.TicketSell(admin, buyer)
    scenario += sale

    sale.mint(dest = admin, amount = 1).run(sender = buyer)
    # scenario.verify(sale.data.balance[admin] == 1)

    # sale.transfer(dest = admin, amount = 1).run(sender = buyer)
    # scenario.verify(sale.data.balances[buyer] == 1)
    sale.buy_ticket().run(sender = admin, amount = sp.tez(1))