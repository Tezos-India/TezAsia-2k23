import smartpy as sp
FA2 = sp.io.import_script_from_url("https://smartpy.io/templates/fa2_lib.py")

class TezMintSFTCollection(FA2.Admin, FA2.Fa2Fungible):
    def __init__(self, **kwargs):    
        FA2.Fa2Fungible.__init__(self, metadata = sp.utils.metadata_of_url("ipfs://bafkreicdcvcxqrxqwjcrdxurhuvvfc2ekofdx4h52swlmbq7tjmnyv4b4q"),token_metadata={},ledger={})
        FA2.Admin.__init__(self, sp.address("tz1bKyWHn17KyS1HApH1c8rrKaoorKkCWqQV"))

    @sp.entry_point
    def mint(self, params):
        sp.set_type(params,sp.TRecord(to_=sp.TAddress,token=sp.TMap(sp.TString, sp.TBytes),amount=sp.TNat))
        token_id = sp.compute(self.data.last_token_id)
        self.data.token_metadata[token_id] = sp.record(token_id=token_id, token_info=params.token)
        self.data.supply[token_id] = params.amount
        self.data.ledger[(params.to_, token_id)] = params.amount
        self.data.last_token_id += 1
               

sp.add_compilation_target("Tez Mint SFT Collection",TezMintSFTCollection())