import smartpy as sp
from utils import utils

@sp.module
def main():
    @sp.effects(with_storage="read-write")
    def gg(x):
        r=10*self.data.ran_num
        m= self.data.time2 - self.data.time1
        y=m*r*m        
        z=sp.mod((~x+ ~y)+~(r),6)+1
        z=sp.mod(z,6)+1
        return sp.to_int(z)


        
    
    class this(sp.Contract):  
        def __init__(self):
            self.data.player = sp.set()
            self.data.sel_num = sp.int(0)
            self.data.ran_num = (sp.int(0))
            self.data.sha_num = sp.int(0)
            self.data.winner = {}

            self.data.no_of_tez = sp.tez(0)
            self.data.time1=sp.int(0)
            self.data.time2 = sp.int(0)

            self.data.check = sp.int(0)
            


        @sp.entrypoint
        def startgame(self,params) :
            self.data.time1 = params.time1
            self.data.player.add(sp.sender)
            self.data.ran_num = params.ran_num

            if self.data.check == sp.int(0) :
                self.data.sha_num =  gg(params.sha_num )
                self.data.check = sp.int(99)
                
            
            


        @sp.entrypoint
        def mybid(self,params):

            self.data.sel_num = params.sel_num 
            self.data.time2 = params.time2
            self.data.no_of_tez = self.data.no_of_tez+params.tez
            
            if self.data.sel_num == self.data.sha_num :
                self.data.winner[len(self.data.winner)] = sp.sender



        @sp.entrypoint
        def endgame(self):
            for ll in sp.range(0,len(self.data.winner),1):
                if self.data.winner[ll] == sp.sender : 
                    sp.send(sp.sender,sp.split_tokens(((self.data.no_of_tez)) , 1 ,len(self.data.winner) ))

            
            self.data.player = sp.set()
            self.data.sel_num = sp.int(0)
            self.data.ran_num = (sp.int(0))
            self.data.sha_num = sp.int(0)
            self.data.no_of_tez = sp.tez(0)
            self.data.time1=sp.int(0)
            self.data.time2 = sp.int(0)
            self.data.check = sp.int(0)

            
            
                
                
                

                
            
            
            

@sp.add_test(name = "first4")
def test():
    
    scenario = sp.test_scenario([utils,main])
    scenario.h1("Welcome")

    c1 = main.this()
    scenario+=c1
    

    ishant = sp.test_account("ishant")
    ishant1 = sp.test_account("ishant1")
    ishant2 = sp.test_account("ishant2")

    
    c1.startgame(time1 = 1,ran_num = 3,sha_num=1).run(sender = ishant)
    c1.startgame(time1 = 2,ran_num = 3,sha_num=1).run(sender = ishant2)
    c1.startgame(time1 = 1,ran_num = 3,sha_num=1).run(sender = ishant1)

    c1.mybid(tez = sp.tez(9),sel_num=4,ran_num=1,time2=11).run(sender=ishant1,valid=True)
    c1.mybid(tez = sp.tez(10),sel_num=4,ran_num=1,time2=11).run(sender=ishant2,valid=True)
    c1.mybid(tez = sp.tez(70),sel_num=6,ran_num=1,time2=11).run(sender=ishant,valid=True)

    c1.endgame().run(sender=ishant2,valid=False)
    c1.endgame().run(sender=ishant1,valid=False)
    c1.endgame().run(sender=ishant,valid=True)
  






