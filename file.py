import smartpy as sp

from DiceRollContract import DiceRollContract

# Define the contract entry point
@sp.add_test(name="Example")
def test():
    contract = DiceRollContract()
    scenario = sp.test_scenario()

    scenario += contract

    # Call the roll_dice entry point
    scenario += contract.roll_dice(roll=3)
