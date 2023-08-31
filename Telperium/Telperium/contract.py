import smartpy as sp
@sp.module
def main():
    class Adder(sp.Contract):
        def __init__(self):
            self.data.sum = 0
            self.data.deadline = sp.timestamp(1693491674)
        

        @sp.entrypoint
        def add(self, x):
            self.data.sum += x
            sp.emit("Help")
        @sp.entrypoint
        def sub(self, x):
            self.data.sum -= x

@sp.add_test(name="my first test")
def test():
    s = sp.test_scenario(main)
    a = main.Adder()
    s += a
    # assert 43 == 44
    a.add(10)
    

