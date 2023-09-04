import smartpy as sp

from templates import fa2_lib as fa2
from templates import fa2_lib_testing as testing

administrator = sp.address("tz1gztg7ExVoksuZE5fyaZ65cmukj1WjpYBP")
alice = sp.address("tz1hrSzZWZZNduZnkNWXf4bjKBzrKKqUP8Nm")
tok0_md = sp.map({'':sp.utils.bytes_of_string("ipfs://QmQtpC6pafM33cbBc6tjhaCcE8cFn66JvnfsJMD3HoUTZf")})
tok1_md = sp.map({'':sp.utils.bytes_of_string("ipfs://QmQtpC6pafM33cbBc6tjhaCcE8cFn66JvnfsJMD3HoUTZf")})
tok2_md = sp.map({'':sp.utils.bytes_of_string("ipfs://QmQtpC6pafM33cbBc6tjhaCcE8cFn66JvnfsJMD3HoUTZf")})
TOKEN_METADATA = [tok0_md, tok1_md, tok2_md]
METADATA = sp.utils.metadata_of_url("ipfs://QmQbaB2Cx6PTFUjkAXcNKEjCy7tY3ysrKjZzVYf5tU7ypf")

main = fa2.main
t = fa2.t

@sp.module
def m():
    class NftTestFull(
        main.Admin,
        main.Nft,
        main.ChangeMetadata,
        main.WithdrawMutez,
        main.MintNft,
        main.BurnNft,
        main.OffchainviewTokenMetadata,
        main.OnchainviewBalanceOf,
    ):
        def __init__(self, administrator, metadata, ledger, token_metadata):
            main.OnchainviewBalanceOf.__init__(self)
            main.OffchainviewTokenMetadata.__init__(self)
            main.BurnNft.__init__(self)
            main.MintNft.__init__(self)
            main.WithdrawMutez.__init__(self)
            main.ChangeMetadata.__init__(self)
            main.Nft.__init__(self, metadata, ledger, token_metadata)
            main.Admin.__init__(self, administrator)

@sp.add_test(name="NFT", is_default=True)
def test():
    sc = sp.test_scenario(t)
    sc.add_module(main)
    sc.add_module(m)
    
    ledger = {0: alice, 1: alice, 2: alice}
    token_metadata = TOKEN_METADATA

    # Default NFT
    c1 = m.NftTestFull(
        administrator=administrator,
        metadata=METADATA,
        ledger=ledger,
        token_metadata=token_metadata,
    )
    sc += c1
    sc.show(c1.data)