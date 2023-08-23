import smartpy as sp

class SelfHelp(sp.Contract):
    def __init__(self):
        self.init(

            #Ids 
            cityIds = sp.nat(0),

            cityDetails = sp.map(l ={},tkey = sp.TNat, tvalue = sp.TRecord(name = sp.TString, theatreIds= sp.TNat)),

            theatreDetails = sp.map(l ={},tkey = sp.TNat, tvalue = sp.TRecord(name = sp.TString,address = sp.TString, movieIds= sp.TNat)),
  
            movieDetails = sp.map(l ={},tkey = sp.TNat, tvalue = sp.TRecord(name = sp.TString, description = sp.TString,posterCID = sp.TString,timeOfCreation = sp.TTimestamp,showsPerDay=sp.TNat,numberOfShows=sp.TNat,ticketPrice=sp.TNat))
            
        )



    @sp.entry_point
    def add_city(self,_name):
         
        self.data.cityDetails[self.data.cityIds] = sp.record(name = _name,theatreIds = 0)
        
        self.data.cityIds +=1


    @sp.entry_point
    def add_theatre(self,params):
        
        sp.set_type(params, sp.TRecord(_cityId=sp.TNat,_name=sp.TString,_address=sp.TString))

        self.data.theatreDetails[self.data.cityDetails[params._cityId].theatreIds] = sp.record(name = params._name,address = params._address, movieIds= 0)

        self.data.cityDetails[params._cityId].theatreIds +=1

    @sp.entry_point
    def add_movie(self,params):
        
        sp.set_type(params, sp.TRecord(_theatreId=sp.TNat,_name=sp.TString,_description=sp.TString,_posterCID = sp.TString,_timeOfCreation = sp.TTimestamp,_showsPerDay=sp.TNat,_numberOfShows=sp.TNat,_ticketPrice=sp.TNat))

        self.data.movieDetails[self.data.theatreDetails[params._theatreId].movieIds] = sp.record(name = params._name,description = params._description, posterCID = params._posterCID,timeOfCreation= params._timeOfCreation,showsPerDay= params._showsPerDay,numberOfShows= params._numberOfShows,ticketPrice=params._ticketPrice)

        self.data.theatreDetails[params._theatreId].movieIds +=1

    

@sp.add_test(name="main")
def test():
    scenario = sp.test_scenario()

    # Test address
    admin = sp.test_account("admin")
    alice = sp.test_account("alice")
    bob = sp.test_account("bob")
    charles = sp.test_account("charles")
    

    # Create contract
    auction = SelfHelp() 
    scenario += auction

    # change_num_values
    scenario.h2("Auction Test 1")   

    scenario += auction.add_city("Chennai").run(sender = alice)
    scenario += auction.add_theatre(_cityId=0,_name="Ankit",_address="Ankit").run(sender = alice)
    scenario += auction.add_movie(_theatreId=0,_name="Brahmastra",_description="Great Movie",_posterCID = "sdfdsdfsddf",_timeOfCreation = sp.now,_showsPerDay=4,_numberOfShows=16,_ticketPrice=200).run(sender = alice)