#Author:IN4111
#Github:IN4111
#Importing packages
import smartpy as sp
from utils import utils
@sp.module
def main():
    class DiceRollingGame(sp.Contract):
        def __init__(self):
            self.data=sp.record(
                game_code="",
                players = {},
                winners = [],
                winners_count=sp.nat(0),
                totalBets =sp.nat(0),
                Dice = sp.int(-1),
                admin=sp.address("tz1PtX8vDfBFsD5GJEmrCdXiqabETCvLVaYp"),
            )
        @sp.entry_point
        def Set_Dice(self, params):
            assert sp.sender == self.data.admin, "Only admin can set dice"
            assert params.dice >=1 and params.dice <=6,"Dice Out Of range"
            assert self.data.Dice == -1,"Dice Already Set"
            self.data.game_code=params.code
            self.data.Dice=params.dice
        @sp.entry_point
        def join(self, params):
            assert params.game_code==self.data.game_code,"Game Code is invalid"
            assert sp.amount == utils.nat_to_tez(params.bet),"Transaction Failed"
            assert self.data.Dice!=-1, "Dice has not been set Try again after Dice has set"
            assert not self.data.players.contains(sp.sender), "Player is already in the game"

            self.data.players[sp.sender] = sp.record(player=sp.sender,guess=params.guess, bet=params.bet)
            self.data.totalBets+=params.bet

        @sp.entry_point
        def reveal(self):
            assert self.data.players.contains(sp.sender), "Player is not in the game"
            assert self.data.Dice!=-1, "Dice has not been set"

            if self.data.players[sp.sender].guess == self.data.Dice:
                self.data.winners.push(sp.sender)
                self.data.winners_count+=1

        @sp.entry_point
        def distribute(self):
            assert sp.sender == self.data.admin, "Only admin can distribute funds"
            assert self.data.winners_count > 0, "No winners to distribute to"

            totalPool = sp.nat(0)
            for player in self.data.winners:
                totalPool += self.data.players[player].bet

            for player in self.data.winners:
                winnings=utils.nat_to_mutez(((self.data.players[player].bet * self.data.totalBets) /totalPool)*1000000)
                sp.cast(winnings,sp.mutez)
                sp.send(self.data.players[player].player, winnings)
            #reset game after prize distribution
            self.data=sp.record(
                game_code="",
                players = {},
                winners = [],
                winners_count=sp.nat(0),
                totalBets =sp.nat(0),
                Dice = sp.int(-1),
                admin=sp.address("tz1PtX8vDfBFsD5GJEmrCdXiqabETCvLVaYp"),
            )

if "admin" not in locals():
    admin = sp.address("tz1PtX8vDfBFsD5GJEmrCdXiqabETCvLVaYp")  # Admin address goes here

@sp.add_test(name="Dice Rolling Game")
def test():
    test_scenario = sp.test_scenario([utils,main])

    c1 = main.DiceRollingGame()
    test_scenario += c1

    alice = sp.address("tz1alice")
    bob = sp.address("tz1bob")
    jack=sp.address("tz1jack")

    c1.Set_Dice(dice=1,code="544ads").run(sender=admin)

    c1.join(game_code="544ads",guess=1, bet=900).run(sender=alice,amount=sp.tez(900))
    c1.join(game_code="544ads",guess=4, bet=150).run(sender=bob,amount=sp.tez(150))
    c1.join(game_code="544ads",guess=1, bet=300).run(sender=jack,amount=sp.tez(300))


    c1.reveal().run(sender=alice)
    c1.reveal().run(sender=bob)
    c1.reveal().run(sender=jack)

    c1.distribute().run(sender=admin)
