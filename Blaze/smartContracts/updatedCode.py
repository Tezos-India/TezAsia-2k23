# With version 0.17.0 SmartPy introduces a new syntax. This allows users to write code in a syntax even closer to Python. Highlights:

# No more sp.if, sp.for, sp.while. Just write if, for, while instead.

# No more x = sp.local("x", ...) and x = sp.compute(...). Just write x = ... instead.

# No more x.value to access a variable's value. Just write x instead.

# With module syntax, the contract __init__ function can be written in a more Python-like style: instead of calling self.init(x = ...) we can use assignment syntax, just like in Python: self.data.x = ....

# The old syntax is still enabled by default. In order to use the new syntax add new_syntax = True to sp.entrypoint.
import smartpy as sp
@sp.module
def main():
    class Election(sp.Contract):
        def __init__(self):
                # admin = sp.address("tz1M8WJ8tcvqmR1uMovURFA2JdgWFADv74wP"),
                # security_deposit = sp.tez(0),
                # candidateCount = 0,
                # voterCount = 0,
                # isElectionStarted = False,
                # isElectionEnded = False,
                # isElectionOver = False,
                # #election details
                # electionName = "",
                # electionDescription = "",
                # adminName = "",
                # adminEmail = "",
                # totalDonations = sp.tez(0),
                # # candidates has name , address and votes
                # candidates = sp.big_map(tkey=sp.TInt, tvalue=sp.TRecord(
                # name=sp.TString,
                # header=sp.TString, 
                # votes=sp.TNat, 
                # image=sp.TString
                # )),
                # # voters has name, email, phone, address, and hasVoted
                # voters = sp.big_map(tkey=sp.TAddress, tvalue=sp.TRecord(
                #     voterAddress = sp.TAddress, 
                #     name=sp.TString, 
                #     email=sp.TString, 
                #     phone=sp.TString, 
                #     isVerified=sp.TBool, 
                #     hasVoted=sp.TBool, 
                #     isRegistered=sp.TBool, 
                #     govId=sp.TString , 
                #     currentImage=sp.TString, 
                #     voterIdNumber=sp.TString, 
                #     voterIdImage=sp.TString
                # ))
            self.data.admin = sp.address("tz1M8WJ8tcvqmR1uMovURFA2JdgWFADv74wP")
            self.data.security_deposit = sp.tez(0)
            self.data.candidateCount = 0
            self.data.voterCount = 0
            self.data.isElectionStarted = False
            self.data.isElectionEnded = False
            self.data.isElectionOver = False
            #election details
            self.data.electionName = ""
            self.data.electionDescription = ""
            self.data.adminName = ""
            self.data.adminEmail = ""
            self.data.totalDonations = sp.tez(0)
        #    ere is sp.big_map[k, v], denoting lazily deserialized maps from k to v
            # candidates has name , address and votes
            self.data.candidates = {}
            # voters has name, email, phone, address, and hasVoted
            self.data.voters = {}

        @sp.entry_point(new_syntax=False)
        def set_security_deposit(self, value):
            sp.verify(sp.sender == self.data.admin, "Only election admin can change security deposit amount")
            sp.verify(~self.data.isElectionStarted, "Security deposit amount cannot be changed when nominations are open")
            sp.verify(~self.data.isElectionStarted, "Security deposit amount cannot be changed when election is open")
            self.data.security_deposit=sp.utils.nat_to_tez(value)