import smartpy as sp

@sp.module
def main():
    class DiceGame(sp.Contract):
        def __init__(self):
            self.data.players = {}
            self.data.betAmount = sp.tez(0)
            self.data.winningNumber = sp.nat(0)
            self.data.betNumber = sp.nat(0)

        @sp.entry_point
        def buy_bet(self, betNumber, randomNumber):
            self.data.betNumber = sp.as_nat(betNumber)
            self.data.winningNumber = sp.as_nat(randomNumber)
            assert self.data.betNumber > sp.as_nat(0), "Not valid bet number"
            assert self.data.betNumber < sp.as_nat(7), "Not valid bet number"
            self.data.betAmount = sp.amount
            assert sp.amount > sp.tez(0), "Invalid amount"
            self.data.players[0] = sp.sender
            

        @sp.entrypoint
        def closeBet(self): 
            assert self.data.betNumber == self.data.winningNumber, "Not winning bet number"
            sp.send(self.data.players[0], self.data.betAmount) 
            self.data.betAmount = sp.tez(0)
            self.data.betNumber = sp.nat(0)
            

@sp.add_test(name="DiceGame")
def test():
    scenario = sp.test_scenario(main)
    scenario.h1("DiceGame contract")
    scenario.h2("Deploy contract")
    dice = main.DiceGame()
    scenario += dice

    admin = sp.test_account("admin")
    bob = sp.test_account("bob")
    alice = sp.test_account("alice")
    
    dice.buy_bet(betNumber = 5, randomNumber = 5).run(sender = bob, amount = sp.tez(1))
    dice.buy_bet(betNumber = 5, randomNumber = 5).run(sender = alice, amount = sp.tez(1))
    dice.buy_bet(betNumber = 5, randomNumber = 5).run(sender = alice, valid = False)
    
    scenario.h2("End Game")
    dice.closeBet().run()

    # scenario.h2("End Game Fail")
    # dice.closeBet().run(valid = False)

    

    


