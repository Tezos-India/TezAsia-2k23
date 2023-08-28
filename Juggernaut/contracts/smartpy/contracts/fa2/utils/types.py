import smartpy as sp

Fa2TransferType = sp.TList(
    sp.TRecord(
        from_ = sp.TAddress,
        txs = sp.TList(
            sp.TRecord(
                amount = sp.TNat,
                to_ = sp.TAddress,
                token_id = sp.TNat
            ).layout(("to_", ("token_id", "amount")))
        )
    ).layout(("from_", "txs"))
)

BalanceOfReturnType = sp.TList(
    sp.TRecord(
        request = sp.TRecord(
            owner = sp.TAddress,
            token_id = sp.TNat
        ).layout(("owner", "token_id")),
        balance = sp.TNat
    ).layout(("request", "balance"))
)

BalanceOfParamsType = sp.TRecord(
    callback = sp.TContract(BalanceOfReturnType),
    requests = sp.TList(sp.TRecord(
        owner = sp.TAddress,
        token_id = sp.TNat
    ).layout(("owner", "token_id")))
).layout(("requests", "callback"))
