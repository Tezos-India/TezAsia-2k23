import smartpy as sp

class Storage(sp.Contract):
    def __init__(self):
        self.init(
            user  = sp.map(l={},tkey=sp.TAddress,tvalue=sp.TMap(sp.TString,sp.TNat)),
            access_user = sp.map(l={},tkey=sp.TAddress,tvalue=sp.TMap(sp.TAddress, sp.TMap(sp.TString,sp.TNat))),
          
        )

    @sp.entry_point
    def add(self,url):
        sp.set_type(url,sp.TString)
        sp.if self.data.user.contains(sp.sender):
            my_list=self.data.user.get(sp.sender)
            my_list[url] = sp.nat(1)
            self.data.user[sp.sender]=my_list
        sp.else:
            self.data.user[sp.sender]={}
            my_list=self.data.user.get(sp.sender)
            my_list[url] = sp.nat(1)
            self.data.user[sp.sender]=my_list
            self.data.access_user[sp.sender]={}
        
    @sp.entry_point
    def allow(self,params):
        # sp.set_type(other_user,sp.TAddress)
        # sp.set_type(url,sp.TString)
        my_map = self.data.access_user.get(sp.sender)
        sp.if my_map.contains(params.other_user):
            my_list=my_map.get(params.other_user)
            my_list[params.url]=sp.nat(1)
            my_map[params.other_user]=my_list
            self.data.access_user[sp.sender]=my_map
        sp.else:
            my_map[params.other_user]={}
            my_list=my_map.get(params.other_user)
            my_list[params.url]=sp.nat(1)
            my_map[params.other_user]=my_list
            self.data.access_user[sp.sender]=my_map
            
        
        
    @sp.entry_point
    def disallow(self,params):
        my_map=self.data.access_user.get(sp.sender)
        my_list=my_map.get(params.other_user)
        del my_list[params.url]
        my_map[params.other_user] = my_list
        self.data.access_user[sp.sender]=my_map
        

    @sp.entry_point
    def deleteImg(self,url):
        sp.set_type(url,sp.TString)
        my_map=self.data.user.get(sp.sender)
        del my_map[url]
        self.data.user[sp.sender]=my_map
        
    
@sp.add_test(name="Storaged")
def test():
    scenario=sp.test_scenario()
    jatin=sp.test_account("jatin")
    kumar=sp.test_account("kumar")
    
    store=Storage()
    scenario += store
    scenario.h2("Testing (test)")



    store.add("Enter your urll").run(sender=jatin)
    store.add("hii").run(sender=jatin)
    store.add("hii").run(sender=kumar)
    store.add("hii").run(sender=kumar)

    store.allow(sp.record(other_user=sp.address("tz1Q26iHpGnNzXQUhn6rXvyAPC"),url="Hii")).run(sender=jatin)
    store.allow(sp.record(other_user=sp.address("tz26iHpGnNzXQUhn6rXvyAPC"),url="HUi")).run(sender=jatin)
    store.allow(sp.record(other_user=sp.address("tz26iHpGnNzXQUhn6rXvyAPC"),url="HUiii")).run(sender=jatin)
    store.disallow(sp.record(other_user=sp.address("tz26iHpGnNzXQUhn6rXvyAPC"),url="hi")).run(sender=jatin)


    store.disallow(sp.record(other_user=sp.address("tz26iHpGnNzXQUhn6rXvyAPC"),url="HUi")).run(sender=jatin)

    store.deleteImg("Enter your urll").run(sender=jatin)
    