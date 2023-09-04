import smartpy as sp

class Crowdfunding(sp.Contract):
    # def _init_(self, goal, owner):
    def __init__(self):
        self.init(
            total_amount=sp.tez(0),
            goal=sp.tez(10),
            contributors=sp.map(l={},tkey=sp.TAddress, tvalue=sp.TMutez),
            is_goal_achieved=False,
            is_closed=False,
            owner=sp.address("tz1X6UYALVWT2C5LGRKLCRAF8tCZFH4zY5PK")
        )
    
    @sp.entry_point
    def contribute(self):
        sp.verify(sp.sender != self.data.owner, "Owner cannot contribute")
        sp.verify(self.data.is_closed!=True, "Crowdfunding is closed")
        # sp.verify(self.data.total_amount + sp.amount <= self.data.goal, "Goal already achieved")

        # goal- 10 total_amount=8 sp.amount =3
        self.data.total_amount+=sp.amount
        # sp.if temp>self.data.goal:
            # temp=self.data.total_amount+ sp.amount
            # extra_balance = temp - self.data.goal
            # sp.send(sp.sender, extra_balance)
            # sp.amount=self.data.goal-self.data.total_amount
            # self.data.total_amount += sp.amount
        sp.if self.data.total_amount > self.data.goal:
            extra_balance = self.data.total_amount - self.data.goal
            sp.send(sp.sender, extra_balance)
            self.data.total_amount = self.data.goal
        
        sp.if self.data.contributors.contains(sp.sender):
            self.data.contributors[sp.sender] += sp.amount
        sp.else:
            self.data.contributors[sp.sender] = sp.amount
        
        sp.if self.data.total_amount >= self.data.goal:
            self.data.is_goal_achieved = True
            
            
    @sp.entry_point
    def withdraw(self):
        sp.verify(self.data.is_closed==False, "Funding Closed")
        sp.verify(self.data.contributors.contains(sp.sender), "You haven't contributed")
        
        # amount = self.data.contributors[sp.sender]
        amount = self.data.contributors.get(sp.sender, sp.tez(0))
        self.data.total_amount=self.data.total_amount-amount
        del self.data.contributors[sp.sender]
        sp.verify(sp.amount == sp.tez(0), "No attached amount allowed")
        sp.send(sp.sender, amount)
        sp.if self.data.is_goal_achieved==True:
            self.data.is_goal_achieved=False
    
    @sp.entry_point
    def close(self):
        sp.verify(sp.sender == self.data.owner, "Only the owner can close the crowdfunding")
        sp.verify(self.data.is_goal_achieved==True,"Goal not achieved yet")
        sp.send(self.data.owner,self.data.total_amount)
        self.data.is_closed = True

@sp.add_test(name="Crowdfunding")
def test():
    scenario = sp.test_scenario()
    alice = sp.test_account("alice")
    bob = sp.test_account("bob")
    admin = sp.test_account("admin")
    charlie = sp.test_account("charlie")
    operator_address = sp.address("tz1X6UYALVWT2C5LGRKLCRAF8tCZFH4zY5PK")
    crowdfunding = Crowdfunding()
    scenario += crowdfunding
    
    # Contribute 1 from Alice
    scenario += crowdfunding.contribute().run(amount = sp.tez(1), sender=alice)
    scenario.verify(crowdfunding.data.total_amount == sp.tez(1))
    
    # Contribute 7 from Bob
    scenario += crowdfunding.contribute().run(amount=sp.tez(7),sender=bob)
    scenario.verify(crowdfunding.data.total_amount == sp.tez(8))
    
    # Contribute 2 from Charlie to achieve the goal
    scenario += crowdfunding.contribute().run(amount=sp.tez(2),sender=charlie)
    scenario += crowdfunding.withdraw().run(sender=alice)
    
    # scenario.verify(crowdfunding.data.is_goal_achieved)
    
    # Try to contribute from the owner
    scenario += crowdfunding.contribute().run(amount=sp.tez(1),sender=operator_address).run(valid=False)
    scenario += crowdfunding.contribute().run(amount = sp.tez(1), sender=alice)
    # Withdraw the contributed amount
    # scenario += crowdfunding.withdraw().run(sender=charlie)
    # scenario.verify(crowdfunding.data.contributors.get(charlie.address) is None)
    # scenario.verify(sp.balance == sp.tez(100))
    
    # Close the crowdfunding
    
    scenario += crowdfunding.close().run(sender=operator_address)
    scenario.verify(crowdfunding.data.is_closed)