import smartpy as sp

# @sp.module 
def main():
 class TimedPaymentContract(sp.Contract):
     def __init__(self, initial_amount, recipient, release_time):
         self.init(
             initial_balance = sp.mutez(initial_amount),
             recipient = recipient,
             release_time = release_time
         )

     @sp.entry_point
     def send_payment(self):
         sp.verify(sp.now >= self.data.release_time, message="Payment release time not reached yet")
         sp.verify(sp.sender == self.data.recipient, message="Only the specified recipient can call this entry point")
         sp.transfer(self.data.initial_balance, sp.sender)

 @sp.add_test(name="Timed Payment Contract")
 def test():
     test_recipient = sp.address("tz1RecipientAddress")
     contract_creator = sp.address("tz1CreatorAddress")  # Replace with the creator's address
     init_time = sp.timestamp(2000000000)  # Replace with the desired initialization timestamp
     release_time = sp.timestamp(3000000000)  # Replace with the desired release timestamp
     initial_amount = 1000000  # Amount in mutez (1 tez = 1,000,000 mutez)

     c = sp.Contract.of(TimedPaymentContract(initial_amount, test_recipient, release_time))
     scenario = sp.test_scenario()
     scenario += c

    # Try initializing the contract before the initialization time
     scenario.h1("Trying to initialize before the initialization time (should fail)")
     scenario += c
     scenario += c.send(initial_amount).run(sender=contract_creator, now=init_time - sp.timestamp(1000))

    # Wait until after the initialization time
     scenario.h1("Waiting until initialization time")
     scenario += sp.advance_time_and_block(init_time - sp.timestamp(100))

    # Initialize the contract after the initialization time
     scenario.h1("Initializing the contract after initialization time")
     scenario += c
     scenario += c.send(initial_amount).run(sender=contract_creator)

    # Try sending payment before the release time
     scenario.h1("Trying to send payment before the release time (should fail)")
     scenario += c.send_payment().run(sender=test_recipient, now=release_time - sp.timestamp(1000))

    # Wait until after the release time
     scenario.h1("Waiting until release time")
     scenario += sp.advance_time_and_block(release_time - sp.timestamp(100))

    # Send the payment after the release time
     scenario.h1("Sending payment after release time")
     scenario += c.send_payment().run(sender=test_recipient)

    # The contract balance should now be zero
     scenario.verify(c.data.initial_balance == 0)

    # Try sending payment again (should fail since the balance is zero)
     scenario.h1("Trying to send payment again (should fail)")
     scenario += c.send_payment().run(sender=test_recipient)

# Run the test
 test()
