import smartpy as sp


class DiceRollContract(sp.Contract):
    def __init__(self):
        self.init(reward=sp.mutez(0))

    @sp.entry_point
    def roll_dice(self, params):
        sp.verify(params.roll >= 1 and params.roll <= 6, message="Invalid dice roll")
        sp.send(sp.sender, self.data.reward)
        self.data.reward += sp.mutez(1)