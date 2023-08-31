import smartpy as sp

@sp.module
def main():
    class Story(sp.Contract):
        def __init__(self, title, first_chapter_hash, author):
            self.data.author = author
            self.data.crafters = sp.set()
            self.data.title = title
            self.data.chapters = {}
            self.data.ongoing = True
            self.data.chapter_id = sp.nat(1)
            self.data.chapters[1] = first_chapter_hash
            self.data.current_proposal = sp.record(
                votes = {},
                option_1 = "",
                option_2 = "",
                option_3 = "",
                deadline = sp.timestamp(0),
                active = False
            )

        @sp.entry_point
        def propose_chapter(self, params):
            assert sp.sender == self.data.author, "Sender is not the Author"
            assert self.data.current_proposal.active == False, "Already a proposal is in progress"
            assert self.data.ongoing == True, "This story has been completed"
            assert sp.amount == sp.tez(1), "1 Tez has to be sent for each new chapter being proposed"
            
            self.data.current_proposal.option_1 = params.option_1
            self.data.current_proposal.option_2 = params.option_2
            self.data.current_proposal.option_3 = params.option_3

            temp = sp.add_seconds(sp.now, sp.int(172800))
            self.data.current_proposal.deadline = temp
            self.data.current_proposal.active = True

        @sp.entry_point
        def vote(self, option_num):
            assert self.data.crafters.contains(sp.sender), "You must be a crafter to vote"
            assert self.data.current_proposal.active == True, "There is no active proposal at the moment"
            assert sp.now < self.data.current_proposal.deadline, "The deadline for the voting has passed"
            assert option_num == 1 or option_num == 2 or option_num == 3, "Send a valid input number between 1-3"
            assert self.data.ongoing == True, "This story has been completed"

            voted_keys = self.data.current_proposal.votes.keys()
            
            self.data.current_proposal.votes[sp.sender] = option_num

        @sp.entry_point
        def check_result(self):
            assert sp.sender == self.data.author, "Sender is not the author"
            assert self.data.current_proposal.active == True, "No active proposal"
            assert sp.now >= self.data.current_proposal.deadline, "Deadline not reached yet"
            assert self.data.ongoing == True, "This story has been completed"

            one_count = 0
            two_count = 0
            three_count = 0

            voted_entries = self.data.current_proposal.votes.values()
            for i in voted_entries: 
                if i == 1:
                    one_count = one_count + 1
                if i == 2:
                    two_count = two_count + 1
                if i == 3:
                    three_count = three_count + 1

            current_chapter = self.data.chapter_id + 1
            self.data.chapter_id = current_chapter

            if one_count == two_count and two_count == three_count:
                self.data.chapters[current_chapter] = self.data.current_proposal.option_1
            if one_count > two_count and one_count > three_count:
                self.data.chapters[current_chapter] = self.data.current_proposal.option_1
            if two_count > one_count and two_count > three_count:
                self.data.chapters[current_chapter] = self.data.current_proposal.option_2
            if three_count > one_count and three_count > two_count:
                self.data.chapters[current_chapter] = self.data.current_proposal.option_3

            self.data.current_proposal = sp.record(
                votes = {},
                option_1 = "",
                option_2 = "",
                option_3 = "",
                active = False,
                deadline = sp.timestamp(0)
            )

        @sp.entry_point
        def subscribe_story(self):
            assert sp.sender != self.data.author, "Cannot subscribe your own story"
            assert sp.amount == sp.tez(1), "Must send 1 Tez for subscribing"
            assert self.data.crafters.contains(sp.sender) == False, "You can only subscribe once"

            self.data.crafters.add(sp.sender)


        @sp.entry_point
        def last_chapter(self, last_chapter_hash):
            assert sp.sender == self.data.author, "Only Author can publish the last chapter"
            assert sp.amount == sp.tez(1), "Must send 1 Tez"
            assert self.data.current_proposal.active == False, "There is a proposal in progress"
            assert self.data.ongoing == True, "This story has been completed"

            current_chapter = self.data.chapter_id + 1
            self.data.chapter_id = current_chapter
            self.data.chapters[current_chapter] = last_chapter_hash
            self.data.ongoing = False

    class StoryCreator(sp.Contract):
        def __init__(self):
            self.data.storyList = []

        @sp.entrypoint
        def createStory(self, params):
            story = sp.create_contract(Story, None, sp.mutez(0), sp.record(title = params.title, 
                                                                           author = sp.sender,
                                                                           chapter_id = sp.nat(1),
                                                                           ongoing = True,
                                                                           chapters = { 1 : params.first_chapter_hash },
                                                                           crafters = sp.set(),
                                                                           current_proposal = sp.record(
                                                                                votes = {},
                                                                                option_1 = "",
                                                                                option_2 = "",
                                                                                option_3 = "",
                                                                                deadline = sp.timestamp(0),
                                                                                active = False
                                                                                )
                                                                          ))
            self.data.storyList.push(story)

@sp.add_test(name = "Story Contract")
def test():
    title = "The Chronicles of SmartPy"
    first_chapter_hash = "0x00"
    alice = sp.test_account("alice")
    scenario = sp.test_scenario(main)
    contract = main.Story(title, first_chapter_hash, alice.address)
    creator_contract = main.StoryCreator()
    scenario += contract
    scenario += creator_contract

    # Testing the initial storage values after deployment
    scenario.verify(contract.data.author == alice.address)
    scenario.verify(contract.data.title == title)
    scenario.verify(contract.data.ongoing == True)
    scenario.verify(contract.data.current_proposal.active == False)

    # Testing the propose_chapter entry point
    option_1 = "0x00"
    option_2 = "0x00"
    option_3 = "0x00"
    contract.propose_chapter(sp.record(option_1 = option_1, option_2 = option_2, option_3 = option_3)).run(sender = alice, amount = sp.tez(1))
    scenario.verify(contract.data.current_proposal.active == True)
    scenario.verify(contract.data.current_proposal.deadline == sp.now.add_seconds(172800))
    scenario.verify(contract.data.current_proposal.option_1 == option_1)

    # Testing the subscription entry point
    crafter = sp.test_account("crafter")
    contract.subscribe_story().run(sender = crafter, amount = sp.tez(1))
    scenario.verify(contract.data.crafters.contains(crafter.address))

    # Testing the vote entry point
    contract.vote(1).run(sender = crafter)
    scenario.verify(contract.data.current_proposal.votes[crafter.address] == 1)

    # Testing check_result after voting
    contract.check_result().run(sender = alice, valid = False)
    scenario.verify(contract.data.current_proposal.active == False)
    scenario.verify(len(contract.data.current_proposal.votes) == 0)

    # Publishing the last chapter
    last_chapter_hash = sp.bytes("hash_of_last_chapter")
    contract.last_chapter(last_chapter_hash).run(sender = alice, amount = sp.tez(1))
    scenario.verify(contract.data.ongoing == False)
    scenario.verify(contract.data.chapters[contract.data.chapter_id] == last_chapter_hash)