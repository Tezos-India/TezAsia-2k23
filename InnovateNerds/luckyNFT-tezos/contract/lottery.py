import smartpy as sp

from templates import fa2_lib as fa2
from templates import fa2_lib_testing as testing

administrator = sp.test_account("Administrator")
alice = sp.test_account("Alice")
tok0_md = fa2.make_metadata(name="Token Zero", decimals=1, symbol="Tok0")
tok1_md = fa2.make_metadata(name="Token One", decimals=1, symbol="Tok1")
tok2_md = fa2.make_metadata(name="Token Two", decimals=1, symbol="Tok2")
TOKEN_METADATA = [tok0_md, tok1_md, tok2_md]
METADATA = sp.utils.metadata_of_url("ipfs://QmRGyq6Kj6cAc8MQff6DfMyFa5XdCHjtxsXoV6yaMz4Qoc")

main = fa2.main


@sp.module
def m():
    # Order of inheritance: [Admin], [<policy>], <base class>, [<mixins>]

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

    class NftTestNoTransfer(main.NoTransfer, main.Nft):
        def __init__(self, metadata, ledger, token_metadata):
            main.Nft.__init__(self, metadata, ledger, token_metadata)
            main.NoTransfer.__init__(self)

    class NftTestOwnerTransfer(main.OwnerTransfer, main.Nft):
        def __init__(self, metadata, ledger, token_metadata):
            main.Nft.__init__(self, metadata, ledger, token_metadata)
            main.OwnerTransfer.__init__(self)

    class NftTestPauseOwnerOrOperatorTransfer(
        main.Admin, main.PauseOwnerOrOperatorTransfer, main.Nft
    ):
        def __init__(self, administrator, metadata, ledger, token_metadata):
            main.Nft.__init__(self, metadata, ledger, token_metadata)
            main.PauseOwnerOrOperatorTransfer.__init__(self)
            main.Admin.__init__(self, administrator)


@sp.add_test(name="NFT", is_default=True)
def test():
    ledger = {0: alice.address, 1: alice.address, 2: alice.address}
    token_metadata = TOKEN_METADATA

    # Default NFT
    c1 = m.NftTestFull(
        administrator=administrator.address,
        metadata=METADATA,
        ledger=ledger,
        token_metadata=token_metadata,
    )

    # No transfer
    c2 = m.NftTestNoTransfer(
        metadata=METADATA,
        ledger=ledger,
        token_metadata=token_metadata,
    )

    # Owner transfer
    c3 = m.NftTestOwnerTransfer(
        metadata=METADATA,
        ledger=ledger,
        token_metadata=token_metadata,
    )

    # Empty NFT
    c4 = m.NftTestFull(
        administrator=administrator.address,
        metadata=METADATA,
        ledger={},
        token_metadata=[],
    )

    # Pause owner or operator transfera
    c5 = m.NftTestPauseOwnerOrOperatorTransfer(
        administrator=administrator.address,
        metadata=METADATA,
        ledger=ledger,
        token_metadata=token_metadata,
    )

    kwargs = {"modules": [fa2.t, fa2.main, m], "ledger_type": "NFT"}

    # Standard features
    testing.test_core_interfaces(c1, **kwargs)
    testing.test_transfer(c1, **kwargs)
    testing.test_balance_of(c1, **kwargs)
    # Policies
    testing.test_owner_or_operator_transfer(c1, **kwargs)
    testing.test_no_transfer(c2, **kwargs)
    testing.test_owner_transfer(c3, **kwargs)

    # Non standard features
    testing.NS.test_admin(c1, **kwargs)
    testing.NS.test_mint(c4, **kwargs)
    testing.NS.test_burn(c1, supports_transfer=True, supports_operator=True, **kwargs)
    testing.NS.test_withdraw_mutez(c1, **kwargs)
    testing.NS.test_change_metadata(c1, **kwargs)
    testing.NS.test_get_balance_of(c1, **kwargs)
    # Non standard policies
    testing.NS.test_pause(c5, **kwargs)