import smartpy as sp

Errors = sp.io.import_script_from_url("file:contracts/treasury/utils/errors.py")
Types = sp.io.import_script_from_url("file:contracts/treasury/utils/types.py")

FA12TransferType = sp.TRecord(
    from_ = sp.TAddress,
    to_ = sp.TAddress,
    value = sp.TNat
).layout(("from_ as from", ("to_ as to", "value")))


class Treasury(sp.Contract):
    def __init__(self, admin, manager, fa12, metadata):
        self.init(
            admin = admin,
            manager = manager,
            fa12 = fa12,
            paused = False,
            metadata = metadata,
        )

    def is_admin(self, address):
        return address == self.data.admin

    def is_admin_or_manager(self, address):
        return (address == self.data.admin) | (address == self.data.manager)

    def is_paused(self):
        return self.data.paused

    @sp.entry_point
    def set_admin(self, address):
        sp.set_type(address, sp.TAddress)
        sp.verify(self.is_admin(sp.sender), Errors.NOT_ADMIN)
        self.data.admin = address

    @sp.entry_point
    def set_manager(self, address):
        sp.set_type(address, sp.TAddress)
        sp.verify(self.is_admin(sp.sender), Errors.NOT_ADMIN)
        self.data.manager = address

    @sp.entry_point
    def set_pause(self, params):
        sp.set_type(params, sp.TBool)
        sp.verify(self.is_admin(sp.sender), Errors.NOT_ADMIN)
        self.data.paused = params

    @sp.entry_point
    def withdraw(self, params):
        sp.set_type(params, sp.TRecord(
            user=sp.TAddress,
            amount=sp.TNat,
        ))
        sp.verify( ~self.is_paused(), "PAUSED")
        sp.verify(self.is_admin_or_manager(sp.sender), Errors.NOT_ADMIN_OR_MANAGER)

        token_contract = sp.contract(
            FA12TransferType, self.data.fa12, "transfer"
        ).open_some()

        data = sp.record(
            from_ = sp.self_address,
            to_ = params.user,
            value = params.amount
        )

        sp.transfer(data, sp.mutez(0), token_contract)
