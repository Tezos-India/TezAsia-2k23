import smartpy as sp
FA2 = sp.io.import_script_from_url("https://smartpy.io/templates/fa2_lib.py")

class TezMintCollection(FA2.Admin, FA2.Fa2Nft):
    def __init__(self, **kwargs):    
        FA2.Fa2Nft.__init__(self, metadata = sp.utils.metadata_of_url("ipfs://bafkreicdcvcxqrxqwjcrdxurhuvvfc2ekofdx4h52swlmbq7tjmnyv4b4q"),token_metadata={},ledger={})
        FA2.Admin.__init__(self, sp.address("tz1bKyWHn17KyS1HApH1c8rrKaoorKkCWqQV"))

    @sp.entry_point
    def mint(self,params):
      "Anyone can mint from this collection"
      sp.set_type(
        params,
        sp.TRecord(to_=sp.TAddress,metadata=sp.TMap(sp.TString,sp.TBytes)).layout(("to_","metadata"))
      )

      token_id = sp.compute(self.data.last_token_id)
      metadata = sp.record(token_id=token_id,token_info=params.metadata)
      self.data.token_metadata[token_id] = metadata # Add ifps metadata link to token_metadata big map
      self.data.ledger[token_id] = params.to_ #Add the address to the owners list 
      self.data.last_token_id += 1


sp.add_compilation_target("Tez Mint Collection",TezMintCollection())