import smartpy as sp
@sp.module
def main():
    class TimedCall(sp.Contract):
        def __init__(self):
            self.init(
                time_limit = sp.timestamp_from_utc_now().add_days(365),
                val = sp.nat(5)
            )

        @sp.entry_point
        def timed_method(self, param):
            sp.set_type(param, sp.TNat)
            sp.verify(sp.now < self.data.time_limit, "TIME LIMIT CROSSED")
            self.data.val = param
