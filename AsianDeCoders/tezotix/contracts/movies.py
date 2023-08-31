import smartpy as sp
FA2_contract = sp.io.import_stored_contract('FA2.py')


class TezoTix(sp.Contract):
    def __init__(self):
        self.init(

            # It contains the contract address of the NFT contract
            nft_contract_address=sp.address("KT1JoCosSDUHqKPGJuK7BKLKUysX22ZDDN5V"),   

            #Ids 
            cityIds = sp.nat(0),

            mint_index = sp.nat(0),

            cityDetails = sp.map(l ={},tkey = sp.TNat, tvalue = sp.TRecord(name = sp.TString, theatreIds= sp.TNat)),

            theatreDetails = sp.map(l ={},tkey = sp.TNat, tvalue = sp.TRecord(name = sp.TString,address = sp.TString, movieIds= sp.TInt,theatreOwner=sp.TAddress)),
  
            movieDetails = sp.map(l ={},tkey = sp.TInt, tvalue = sp.TRecord(name = sp.TString, description = sp.TString,posterLink = sp.TString,screenNumber = sp.TNat,ticketPrice=sp.TNat,startingDate = sp.TString,timeSlot=sp.TString)),           
            
            #Key is seat number and value are details
            #Seats are fixed i.e. 100 so 1st movie 1 to 100, 2nd movie 101 to 200, 3rd....
            seatDetails = sp.map(l={}, tkey=sp.TInt, tvalue=sp.TRecord(ticketOwner=sp.TAddress, booked=sp.TBool,mint_index=sp.TNat,metadata=sp.TBytes))
        )

    

    @sp.entry_point
    def add_city(self,_name):
         
        self.data.cityDetails[self.data.cityIds] = sp.record(name = _name,theatreIds = 0)
        
        self.data.cityIds +=1


    @sp.entry_point
    def add_theatre(self,params):
        
        sp.set_type(params, sp.TRecord(_cityId=sp.TNat,_name=sp.TString,_address=sp.TString))

        self.data.theatreDetails[self.data.cityDetails[params._cityId].theatreIds] = sp.record(name = params._name,address = params._address, movieIds= 0,theatreOwner = sp.sender)

        self.data.cityDetails[params._cityId].theatreIds +=1

    @sp.entry_point
    def add_movie(self,params):
        
        sp.set_type(params, sp.TRecord(_theatreId=sp.TNat,_name=sp.TString,_description=sp.TString,_posterLink = sp.TString,_screenNumber = sp.TNat,_ticketPrice = sp.TNat,_startingDate = sp.TString,_timeSlot=sp.TString))

        sp.verify(self.data.theatreDetails[params._theatreId].theatreOwner == sp.sender, message = "Not the owner of the theatre")
        
        self.data.movieDetails[self.data.theatreDetails[params._theatreId].movieIds] = sp.record(name = params._name,description = params._description, posterLink = params._posterLink,screenNumber = params._screenNumber,ticketPrice=params._ticketPrice, startingDate= params._startingDate,timeSlot=params._timeSlot)

        self.data.theatreDetails[params._theatreId].movieIds +=1

    @sp.entry_point
    def book_ticket(self,params):
        
        sp.set_type(params, sp.TRecord(_movieId=sp.TInt,_seatNumber=sp.TInt,_metadata=sp.TBytes))

        self.data.seatDetails[(params._movieId+1)*100-100+params._seatNumber] = sp.record(ticketOwner = sp.sender,mint_index=self.data.mint_index,booked=True,metadata=params._metadata)
  
        # Inter-contract call take place here to mint the artwork
        
        c = sp.contract(
            sp.TRecord(
                token_id=sp.TNat,
                amount=sp.TNat,
                address=sp.TAddress,
                metadata=sp.TMap(sp.TString, sp.TBytes),
            ),
            self.data.nft_contract_address,
            "mint",
        ).open_some()

        sp.transfer(
                    sp.record(
                        token_id=self.data.mint_index,
                        amount=self.data.movieDetails[params._movieId].ticketPrice,
                        address=sp.sender,
                        metadata={"": self.data.seatDetails[(params._movieId+1)*100-100+params._seatNumber].metadata},
                    ),
                    sp.tez(0),
                    c,
                )
        
        self.data.mint_index += 1

@sp.add_test(name="main")
def test():
    scenario = sp.test_scenario()

    # Test address
    admin = sp.test_account("admin")
    alice = sp.test_account("alice")
    bob = sp.test_account("bob")
    charles = sp.test_account("charles")

    # Create contract
    auction = TezoTix() 
    scenario += auction

    # change_num_values
    scenario.h2("Auction Test 1")   

    scenario += auction.add_city("Chennai").run(sender = alice)
    scenario += auction.add_theatre(_cityId=0,_name="Ankit",_address="Ankit").run(sender = alice)
    scenario += auction.add_theatre(_cityId=0,_name="XYZ",_address="Ankit").run(sender = bob)
    scenario += auction.add_movie(_theatreId=0,_name="Brahmastra",_description="Great Movie",_posterLink = "sdfdsdfsddf",_screenNumber=1,_ticketPrice = 100,_startingDate = "16/08/2023",_timeSlot="9 to 12").run(sender = alice)
    scenario += auction.add_movie(_theatreId=0,_name="John Wick",_description="Great Movie",_posterLink = "sdfdsdfsddf",_screenNumber=1,_ticketPrice = 100,_startingDate = "16/08/2023",_timeSlot="9 to 12").run(sender = alice)
    scenario += auction.book_ticket(_movieId=0,_seatNumber=10,_metadata=sp.bytes('0x30')).run(sender = alice)
    scenario += auction.book_ticket(_movieId=1,_seatNumber=11,_metadata=sp.bytes('0x30')).run(sender = bob)

