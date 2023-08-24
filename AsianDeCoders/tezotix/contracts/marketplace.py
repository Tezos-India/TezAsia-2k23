import smartpy as sp

# Import the modified FA2 contract
FA2_contract = sp.io.import_stored_contract('FA2.py')

def global_parameter(env_var, default):
    try:
        if os.environ[env_var] == "true":
            return True
        if os.environ[env_var] == "false":
            return False
        return default
    except:
        return default

def environment_config():
    return FA2_contract.FA2_config(
        debug_mode=global_parameter("debug_mode", False),
        single_asset=global_parameter("single_asset", False),
        non_fungible=global_parameter("non_fungible", True),
        add_mutez_transfer=global_parameter("add_mutez_transfer", False),
        readable=global_parameter("readable", True),
        force_layouts=global_parameter("force_layouts", True),
        support_operator=global_parameter("support_operator", True),
        assume_consecutive_token_ids=global_parameter(
            "assume_consecutive_token_ids", True),
        store_total_supply=global_parameter("store_total_supply", False),
        lazy_entry_points=global_parameter("lazy_entry_points", False),
        allow_self_transfer=global_parameter("allow_self_transfer", False),
        use_token_metadata_offchain_view=global_parameter(
            "use_token_metadata_offchain_view", True),
    )

class Operator_param:
    def get_type(self):
        t = sp.TRecord(
            owner=sp.TAddress,
            operator=sp.TAddress,
            token_id=sp.TNat)

    def make(self, owner, operator, token_id):
        r = sp.record(owner=owner,
                      operator=operator,
                      token_id=token_id)
        return sp.set_type_expr(r, self.get_type())

class Share:
    def get_type(self):
        t = sp.TRecord(
            recipient=sp.TAddress,
            amount=sp.TNat)

    def make(self, recipient, amount):
        r = sp.record(
            recipient=recipient,
            amount=amount)
        return sp.set_type_expr(r, self.get_type())

class Ask:
    def __init__(self):
        self.type_value = sp.TRecord(
            creator = sp.TAddress,
            token = sp.TRecord(
                address = sp.TAddress,
                token_id = sp.TNat
            ),
            amount = sp.TMutez,
            editions = sp.TNat,
            expiry_time = sp.TOption(sp.TTimestamp),
            shares = sp.TList(Share().get_type())
        )

    def set_type(self): return sp.map(l = {}, tkey = sp.TNat, tvalue = self.type_value)
    
    def set_value(self, _params):
        return sp.record(
            creator = _params.creator,
            token = _params.token,
            amount = _params.amount,
            editions = _params.editions,
            expiry_time = _params.expiry_time,
            shares = _params.shares
        )
    
class Offer:
    def __init__(self):
        self.type_value = sp.TRecord(
            creator = sp.TAddress,
            token = sp.TRecord(
                address = sp.TAddress,
                token_id = sp.TNat
            ),
            amount = sp.TMutez,
            expiry_time = sp.TOption(sp.TTimestamp),
            shares = sp.TList(Share().get_type())
        )
    
    def set_type(self): return sp.map(l = {}, tkey = sp.TNat, tvalue = self.type_value)

    def set_value(self, _params):
        return sp.record(
            creator = _params.creator,
            token = _params.token,
            amount = _params.amount,
            expiry_time = _params.expiry_time,
            shares = _params.shares
        )

class Batch_transfer:
    def get_transfer_type():
        tx_type = sp.TRecord(to_=sp.TAddress,
                             token_id=sp.TNat,
                             amount=sp.TNat)
        transfer_type = sp.TRecord(from_=sp.TAddress,
                                   txs=sp.TList(tx_type)).layout(
                                       ("from_", "txs"))
        return transfer_type

    def get_type():
        return sp.TList(Batch_transfer.get_transfer_type())

    def item(from_, txs):
        v = sp.record(from_=from_, txs=txs)
        return sp.set_type_expr(v, Batch_transfer.get_transfer_type())
    
class Marketplace(sp.Contract):
    def __init__(self, mods, fund_operator):
        self.init(
            # metadata = metadata,
            mods = sp.set(mods),
            fund_operator = fund_operator,
            next_ask_id = sp.nat(0),
            vote_contract = sp.address("KT1XYEGB9FRBEKx3wsHMmohpXRc68VNBty79"),
            asks = Ask().set_type(),
            next_offer_id = sp.nat(0),
            offers = Offer().set_type(),
            platform_fees = sp.nat(20000),
            pause = sp.bool(False),
            default_split = sp.map(l={}, tkey = sp.TString, tvalue = sp.TRecord(address = sp.TList(sp.TAddress),
                                                                                   amount = sp.TNat)),
        )

    def transfer_token(self, contract, params_):
        sp.set_type(contract, sp.TAddress)
        sp.set_type(params_, sp.TList(
                sp.TRecord(
                    from_ = sp.TAddress, 
                    txs = sp.TList(
                        sp.TRecord(
                            amount = sp.TNat, 
                            to_ = sp.TAddress, 
                            token_id = sp.TNat
                        ).layout(("to_", ("token_id", "amount")))
                    )
                )
            .layout(("from_", "txs"))))
        contractParams = sp.contract(sp.TList(
                sp.TRecord(
                    from_ = sp.TAddress, 
                    txs = sp.TList(
                        sp.TRecord(
                            amount = sp.TNat, 
                            to_ = sp.TAddress, 
                            token_id = sp.TNat
                        ).layout(("to_", ("token_id", "amount")))
                    )
                )
            .layout(("from_", "txs"))), contract, entry_point="transfer").open_some()
        sp.transfer(params_, sp.mutez(0), contractParams)
    
    def is_paused(self):
        sp.verify(~self.data.pause, "CONTRACT_PAUSED")

    @sp.entry_point
    def retrieve_curators(self):
        # curator_value = self.data.vote_contract.getCuratorDetails().open_some()
        curator_details = sp.view("getCuratorDetails", self.data.vote_contract, 0, t = sp.TSet(t = sp.TAddress)).open_some("Invalid view");
        
    
    @sp.entry_point
    def add_moderator(self, _moderator):
        sp.set_type(_moderator, sp.TAddress)
        sp.verify(self.data.mods.contains(sp.sender), "NOT_MODERATOR")
        self.data.mods.add(_moderator)
        sp.emit(sp.record(moderator=_moderator),tag="MODERATOR_ADDED")
        
    @sp.entry_point
    def remove_moderator(self, _moderator):
        sp.set_type(_moderator, sp.TAddress)
        sp.verify(self.data.mods.contains(sp.sender), "NOT_MODERATOR")
        sp.verify(self.data.mods.contains(_moderator), "ADDRESS_NAT_MODERATOR")
        self.data.mods.remove(_moderator)
        sp.emit(sp.record(moderator=_moderator),tag="MODERATOR_REMOVED")

    # @sp.entry_point
    # def update_splits(self, params):
    #     sp.verify(self.data.mods.contains(sp.sender), "NOT_MODERATOR")
    #     sp.set_type(params.name, sp.TString)
    #     sp.set_type(
    #         params.split_record,
    #         sp.TRecord(
    #             address=sp.TList(sp.TAddress),
    #             amount=sp.TNat
    #         ),
    #     ).layout(("address","amount"))
    #     self.data.default_split[params.name] = params.split_record
    
    @sp.entry_point
    def update_platform_fees(self, platform_fees):
        sp.set_type(platform_fees, sp.TNat)
        sp.verify(self.data.mods.contains(sp.sender), "NOT_MODERATOR")
        sp.verify(platform_fees < 1000000, "INVALID_SHARES")
        self.data.platform_fees = platform_fees
        sp.emit(sp.record(platform_fees=platform_fees),tag="UPDATE_PLATFORM_FEES")
        
    @sp.entry_point
    def offer(self, params):
        sp.set_type(params, Offer().type_value)
        self.is_paused()
        sp.verify(sp.amount == params.amount, "INVALID_AMOUNT")
        total_shares = sp.local("total_shares", self.data.platform_fees)
        sp.for txn in params.shares:
            total_shares.value += txn.amount
        sp.verify(total_shares.value < 1000000, "INVALID_SHARES")
        self.data.offers[self.data.next_offer_id] = Offer().set_value(params)
        self.data.next_offer_id += 1
        sp.emit(sp.record(creator=params.creator,token=params.token),tag="OFFER_CREATED")

    @sp.entry_point
    def fulfill_offer(self, offer_id):
        sp.set_type(offer_id, sp.TNat)
        self.is_paused()
        sp.verify(self.data.offers.contains(offer_id), "INVALID_OFFER_ID")
        _params = [
                Batch_transfer.item(from_=sp.sender,
                                       txs=[
                                           sp.record(to_=self.data.offers[offer_id].creator,
                                                     amount=1,
                                                     token_id=self.data.offers[offer_id].token.token_id)
                                       ])
            ]
        self.transfer_token(self.data.offers[offer_id].token.address, _params)
        transfer_amount = sp.local("transfer_amount", self.data.offers[offer_id].amount)
        creator_amount = sp.local("transfer_amount", self.data.offers[offer_id].amount)
        # sp.send(self.data.fund_operator, sp.split_tokens(transfer_amount.value, self.data.platform_fees, 1000000))
        # transfer_amount.value = transfer_amount.value - sp.split_tokens(transfer_amount.value, self.data.platform_fees, 1000000)
        sp.for txn in self.data.offers[offer_id].shares:
            sp.send(txn.recipient, sp.split_tokens(transfer_amount.value, txn.amount, 10000))
            transfer_amount.value = transfer_amount.value - sp.split_tokens(transfer_amount.value, txn.amount, 10000)
        sp.send(sp.sender, transfer_amount.value)
        del self.data.offers[offer_id]
        sp.emit(sp.record(offer_id=offer_id),tag="OFFER_FULFILLED")

    @sp.entry_point
    def retract_offer(self, offer_id):
        sp.set_type(offer_id, sp.TNat)
        self.is_paused()
        sp.verify(self.data.offers.contains(offer_id), "INVALID_OFFER_ID")
        sp.verify(self.data.offers[offer_id].creator == sp.sender, "INVALID_CREATOR")
        sp.send(sp.sender, self.data.offers[offer_id].amount)
        del self.data.offers[offer_id]
        sp.emit(sp.record(offer_id=offer_id),tag="OFFER_RETRACTED")

    @sp.entry_point
    def ask(self, params):
        sp.set_type(params, Ask().type_value)
        self.is_paused()
        total_shares = sp.local("total_shares", self.data.platform_fees)
        sp.for txn in params.shares:
            total_shares.value += txn.amount
        sp.verify(total_shares.value < 1000000, "INVALID_SHARES")
        self.data.asks[self.data.next_ask_id] = Ask().set_value(params)
        self.data.next_ask_id += 1
        sp.emit(sp.record(creator=params.creator,token=params.token),tag="ASK_CREATED")

    @sp.entry_point
    def fulfill_ask(self, ask_id):
        sp.set_type(ask_id, sp.TNat)
        self.is_paused()
        sp.verify(self.data.asks.contains(ask_id), "INVALID_ASK_ID")
        sp.verify(sp.amount == self.data.asks[ask_id].amount, "INVALID_AMOUNT")
        transfer_amount = sp.local("transfer_amount", sp.amount)
        creator_amount = sp.local("creator_amount", sp.amount)
        # sp.send(self.data.fund_operator, sp.split_tokens(transfer_amount.value, self.data.platform_fees, 1000000))
        # transfer_amount.value = transfer_amount.value - sp.split_tokens(transfer_amount.value, self.data.platform_fees, 1000000)
        sp.for txn in self.data.asks[ask_id].shares:
            sp.send(txn.recipient, sp.split_tokens(transfer_amount.value, txn.amount, 10000))
            creator_amount.value = creator_amount.value - sp.split_tokens(transfer_amount.value, txn.amount, 10000)
        sp.send(self.data.asks[ask_id].creator, creator_amount.value)
        _params = [
                Batch_transfer.item(from_=self.data.asks[ask_id].creator,
                                       txs=[
                                           sp.record(to_=sp.sender,
                                                     amount=1,
                                                     token_id=self.data.asks[ask_id].token.token_id)
                                       ])
            ]
        self.transfer_token(self.data.asks[ask_id].token.address, _params)
        self.data.asks[ask_id].editions = sp.as_nat(self.data.asks[ask_id].editions - sp.nat(1))
        sp.if self.data.asks[ask_id].editions == 0:
            del self.data.asks[ask_id]
        sp.emit(sp.record(ask_id=ask_id,fulfilled_by=sp.sender),tag="ASK_FULFILLED")

    @sp.entry_point
    def retract_ask(self, ask_id):
        sp.set_type(ask_id, sp.TNat)
        self.is_paused()
        sp.verify(self.data.asks.contains(ask_id), "INVALID_ASK_ID")
        sp.verify(self.data.asks[ask_id].creator == sp.sender, "INVALID_CREATOR")
        del self.data.asks[ask_id]
        sp.emit(sp.record(ask_id=ask_id),tag="ASK_RETRACTED")
    
    @sp.entry_point
    def toggle_pause(self):
        sp.verify(self.data.mods.contains(sp.sender), "NOT_MODERATOR")
        self.data.pause = ~self.data.pause



@sp.add_test(name="Marketplace")
def test():
    sc = sp.test_scenario()
    sc.h1("NFT-Biennial NFT Collection Marketplace")
    sc.table_of_contents()
    admin           =   sp.address("tz1QXAR4RsVTXYU75XBU9ctMYkWYFnZYbgzk")
    alice           =   sp.address("tz1ooALICE")
    bob             =   sp.address("tz1ooBOB")
    elon            =   sp.address("tz1ooELON")
    mark            =   sp.address("tz1ooMARK")
    fund_operator   =   sp.address("tz1QXAR4RsVTXYU75XBU9ctMYkWYFnZYbgzk")
    
    sc.show([admin, alice, bob, mark, elon, fund_operator])
    get_share = Share()

    mp = Marketplace(mods = [admin], fund_operator = fund_operator)
    metadata = sp.map({"": sp.utils.bytes_of_string("https://ipfs.io/ipfs/bafyreias7kz2ryktu34afqwh56pltm32uxsecaxsootklwlsquw5gn3ptq/metadata.json/")})
    fa2 = FA2_contract.FA2(config=environment_config(), metadata=metadata, admin=admin)
    sc.h1("Code")
    sc.h2("Marketplace Code")
    sc += mp
    sc.h2("FA2 Contract Code")
    sc += fa2
    
    sc.h1("Marketplace: Add/Remove Moderator")
    sc += mp.add_moderator(alice).run(sender = admin)
    sc += mp.remove_moderator(alice).run(sender = admin)
    
    sc.h1("FA2: Mint tokens")
    fa2.mint(address=alice,
                amount=50,
                metadata=sp.map({"": sp.utils.bytes_of_string(
                    "https://ipfs.io/ipfs/bafyreias7kz2ryktu34afqwh56pltm32uxsecaxsootklwlsquw5gn3ptq/metadata.json/")}),
                token_id=0).run(sender=admin)

    # sc.h1("Update Splits - mark")
    # sc += mp.update_splits(sp.record(name = "mark", split_record=sp.record(address=[mark], amount=400))).run(sender=admin)

    # sc.h1("Update Splits - bob")
    # sc += mp.update_splits(sp.record(name = "bob", split_record=sp.record(address=[bob], amount=500))).run(sender=admin)
    
    sc.h1("Marketplace: Create Offer")
    offer_data = sp.record(
        creator = admin,
        token = sp.record(
            address = fa2.address,
            token_id = sp.nat(0)
        ),
        amount = sp.tez(1),
        expiry_time = sp.some(sp.timestamp(5)),
        shares = [get_share.make(recipient= admin, amount=sp.nat(1350)),
                 get_share.make(recipient=mark, amount=sp.nat(150))]
    )
    sc += mp.offer(offer_data).run(sender = admin, amount = sp.tez(1))
    sc.show([sp.record(contract_balance = mp.balance)])
    offer_data = sp.record(
        creator = bob,
        token = sp.record(
            address = sp.address("KT1TezoooozzSmartPyzzDYNAMiCzzpLu4LU"),
            token_id = sp.nat(0)
        ),
        amount = sp.tez(5),
        expiry_time = sp.none,
        shares = [get_share.make(recipient= admin, amount=sp.nat(1350)),
                 get_share.make(recipient=mark, amount=sp.nat(150))]
    )

    sc += mp.offer(offer_data).run(sender = bob, amount = sp.tez(5))
    sc.show([sp.record(contract_balance = mp.balance)])
    
    sc.h1("Marketplace: Fulfill Offer")
    
    sc.h2("FA2: Update operators")
    sc += fa2.update_operators([
                sp.variant("add_operator", Operator_param().make(
                    owner=alice,
                    operator=mp.address,
                    token_id=0))]).run(sender=alice)
    
    sc += mp.fulfill_offer(sp.nat(0)).run(sender = alice)

    sc.h1("Marketplace: Retract Offer")
    sc += mp.retract_offer(sp.nat(1)).run(sender = bob)
    sc.show([sp.record(contract_balance = mp.balance)])
    
    sc.h1("Marketplace: Create Ask")
    ask_data = sp.record(
        creator = alice,
        token = sp.record(
            address = sp.address("KT1Tezooo1zzSmartPyzzSTATiCzzzyfC8eF"),
            token_id = sp.nat(0)
        ),
        amount = sp.tez(100),
        editions = sp.nat(2),
        expiry_time = sp.some(sp.timestamp(5)),
        shares = [get_share.make(recipient= admin, amount=sp.nat(1350)),
                 get_share.make(recipient=mark, amount=sp.nat(150))]
    )
    
    sc.h2("FA2: Update operators")
    sc += fa2.update_operators([
                sp.variant("add_operator", Operator_param().make(
                    owner=alice,
                    operator=mp.address,
                    token_id=0))]).run(sender=alice)
    
    sc += mp.ask(ask_data).run(sender=alice)

    ask_data = sp.record(
        creator = bob,
        token = sp.record(
            address = sp.address("KT1TezoooozzSmartPyzzDYNAMiCzzpLu4LU"),
            token_id = sp.nat(0)
        ),
        amount = sp.tez(5),
        editions = sp.nat(5),
        expiry_time = sp.none,
        shares = [get_share.make(recipient= admin, amount=sp.nat(1350)),
                 get_share.make(recipient=mark, amount=sp.nat(150))]
    )
    sc += mp.ask(ask_data).run(sender = bob)
    sc.show([sp.record(contract_balance = mp.balance)])

    sc.h1("Marketplace: Fulfill Ask")
    sc += mp.fulfill_ask(sp.nat(0)).run(sender = elon, amount = sp.tez(100))
    sc.show([sp.record(contract_balance = mp.balance)])

    sc.h1("Marketplace: Fulfill Ask")
    sc += mp.fulfill_ask(sp.nat(1)).run(sender = elon, amount = sp.tez(5))
    
    sc.h1("Marketplace: Retract Ask")
    sc += mp.retract_ask(sp.nat(1)).run(sender = bob)