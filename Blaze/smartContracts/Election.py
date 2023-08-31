import smartpy as sp

class Election(sp.Contract):
    def __init__(self):
        #this is to conduct an election for 2 candidates
        self.init(
            admin = sp.address("tz1M8WJ8tcvqmR1uMovURFA2JdgWFADv74wP"),
            security_deposit = sp.tez(0),
            candidateCount = 0,
            voterCount = 0,
            isElectionStarted = False,
            isElectionEnded = False,
            isElectionOver = False,
            #election details
            electionName = "",
            electionDescription = "",
            adminName = "",
            adminEmail = "",
            adminPhone = "",
            totalDonations = sp.tez(0),
            # candidates has name , address and votes
            candidates = sp.big_map(tkey=sp.TInt, tvalue=sp.TRecord(
            name=sp.TString,
            header=sp.TString, 
            votes=sp.TNat, 
            image=sp.TString
            )),
            # voters has name, email, phone, address, and hasVoted
            voters = sp.big_map(tkey=sp.TAddress, tvalue=sp.TRecord(
                voterAddress = sp.TAddress, 
                name=sp.TString, 
                email=sp.TString, 
                phone=sp.TString, 
                isVerified=sp.TBool, 
                hasVoted=sp.TBool, 
                isRegistered=sp.TBool, 
                govId=sp.TString , 
                currentImage=sp.TString, 
                voterIdNumber=sp.TString, 
                voterIdImage=sp.TString
            ))
        )
    
    @sp.entry_point
    def set_security_deposit(self, value):
        sp.verify(sp.sender == self.data.admin, "Only election admin can change security deposit amount")
        sp.verify(~self.data.isElectionStarted, "Security deposit amount cannot be changed when nominations are open")
        sp.verify(~self.data.isElectionStarted, "Security deposit amount cannot be changed when election is open")
        self.data.security_deposit=sp.utils.nat_to_tez(value)



    @sp.entry_point
    def set_election_details(self, params):
        sp.verify(sp.sender == self.data.admin, "Only election admin can change election details")
        sp.verify(~self.data.isElectionStarted, "Election details cannot be changed when nominations are open")
        sp.verify(~self.data.isElectionStarted, "Election details cannot be changed when election is open")
        self.data.electionName = params.electionName
        self.data.electionDescription = params.electionDescription
        self.data.adminName = params.adminName
        self.data.adminEmail = params.adminEmail
        self.data.adminPhone = params.adminPhone

        

    @sp.entry_point
    def add_candidate(self, params):
        sp.verify(sp.sender == self.data.admin, "Only election admin can add candidates")
        sp.verify(~self.data.isElectionStarted, "Candidates cannot be added when election is open")
        self.data.candidates[self.data.candidateCount] = sp.record(
            name = params.name,
            header = params.header,
            votes = 0,
            image = params.image
        )
        self.data.candidateCount += 1

    @sp.entry_point
    def register_as_voter(self, params):
        sp.verify(~self.data.isElectionStarted, "Voters cannot be registered when election is open")
        # sp.verify(~self.data.voters[sp.sender].isRegistered, "Voter is already registered")
        #check if the the sender address id in the voters map
        sp.if self.data.voters.contains(sp.sender):
            sp.verify(~self.data.voters[sp.sender].isRegistered, "Voter is already registered")
        sp.else:
            self.data.voters[sp.sender] = sp.record(
                voterAddress = sp.sender,
                name = params.name,
                email = params.email,
                phone = params.phone,
                isVerified = False,
                hasVoted = False,
                isRegistered = True,
                govId = params.govId,
                currentImage = params.currentImage,
                voterIdNumber = params.voterIdNumber,
                voterIdImage = params.voterIdImage
            )
            self.data.voterCount += 1

    @sp.entry_point
    def verify_voter(self, params):
        sp.verify(sp.sender == self.data.admin, "Only election admin can verify voters")
        sp.verify(self.data.voters[params.voterAddress].isRegistered, "Voter is not registered")
        sp.verify(~self.data.voters[params.voterAddress].isVerified, "Voter is already verified")

        self.data.voters[params.voterAddress].isVerified = True

    @sp.entry_point
    def start_election(self):
        sp.verify(sp.sender == self.data.admin, "Only election admin can start election")
        sp.verify(~self.data.isElectionStarted, "Election is already started")
        self.data.isElectionStarted = True

    @sp.entry_point
    def end_election(self):
        sp.verify(sp.sender == self.data.admin, "Only election admin can end election")
        sp.verify(self.data.isElectionStarted, "Election is not started")
        sp.verify(~self.data.isElectionEnded, "Election is already ended")
        self.data.isElectionEnded = True
        self.data.isElectionOver = True
        self.data.isElectionStarted = False
   


    @sp.entry_point
    def vote(self, candidateAddress):
        sp.verify(self.data.isElectionStarted, "Election is not started")
        sp.verify(~self.data.isElectionEnded, "Election is already ended")
        sp.verify(self.data.voters[sp.sender].isVerified, "Voter is not verified")
        sp.verify(~self.data.voters[sp.sender].hasVoted, "Voter has already voted")
        self.data.voters[sp.sender].hasVoted = True
        self.data.candidates[candidateAddress].votes += 1


    

@sp.add_test(name = "Election")
def test():
    ayush = sp.test_account("Ayush")
    harry = sp.test_account("Harry")
    subham = sp.test_account("Subham")
    mohan = sp.test_account("Mohan")

    scenario = sp.test_scenario()
    contract = Election()
    scenario += contract

    scenario.h1("Set security deposit")
    scenario += contract.set_security_deposit(1).run(sender=ayush)

    scenario.h1("Set election details")
    scenario += contract.set_election_details(
        sp.record(
            electionName = "Election 1",
            electionDescription = "Election 1 description",
            adminName = "Ayush",
            adminEmail = "admin@gmail.com",
            adminPhone = "1234567890"
        )
    ).run(sender=ayush)
    
    scenario.h1("Add candidates")
    scenario += contract.add_candidate(
        sp.record(
            name = "Harry",
            header = "Harry header",
            image = "Harry image"
        )
    ).run(sender=ayush)
    scenario += contract.add_candidate(
        sp.record(
            name = "Subham",
            header = "Subham header",
            image = "Subham image"
        )
    ).run(sender=ayush)

    scenario.h1("Register as voter")
    scenario += contract.register_as_voter(
        name = "Mohan",
        email = "mohan@gmail.com",
        phone = "1234567890",
        govId = "1234567890",
        currentImage = "Mohan image",
        voterIdNumber = "1234567890",
        voterIdImage = "Mohan voter id image"
    ).run(sender=mohan)

    scenario.h1("Register as voter")
    scenario += contract.register_as_voter(
        name = "Ayush",
        email = "ayush@gmail.com",
        phone = "1234567890",
        govId = "1234567890",
        currentImage = "Mohan image",
        voterIdNumber = "1234567890",
        voterIdImage = "Mohan voter id image"
    ).run(sender=ayush)

    scenario.h1("Verify voter")
    scenario += contract.verify_voter(sp.record(voterAddress=mohan.address)).run(sender=ayush)
    scenario.h1("Verify voter")
    scenario += contract.verify_voter(sp.record(voterAddress=ayush.address)).run(sender=ayush)

    scenario.h1("Start election")
    scenario += contract.start_election().run(sender=ayush)

    scenario.h1("Vote")
    scenario += contract.vote(0).run(sender=mohan)
    scenario.h1("Vote")
    scenario += contract.vote(0).run(sender=ayush)

    scenario.h1("End election")
    scenario += contract.end_election().run(sender=ayush)
