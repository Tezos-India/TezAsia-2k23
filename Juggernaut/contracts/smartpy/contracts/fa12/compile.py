import smartpy as sp

Utils = sp.io.import_script_from_url("file:global_constants/utils.py").Utils
Fa12 = sp.io.import_script_from_url("file:contracts/fa12/contract.py")
Constants = sp.io.import_script_from_url("file:contracts/fa12/utils/constants.py")

FA12 = Fa12.FA12
FA12_config = Fa12.FA12_config
utils = Utils()


sp.add_compilation_target(
    "FA12",
    FA12(
        admin   = sp.address(utils.get_global_constant("admin")),
        config  = FA12_config(
            support_upgradable_metadata         = True,
            use_token_metadata_offchain_view    = True
        ),
        token_metadata = {
            "decimals"    : "18",             # Mandatory by the spec
            "name"        : "CTez", # Recommended
            "symbol"      : "CTz",            # Recommended
            # Extra fields
            "icon"        : 'https://legacy.smartpy.io/static/img/logo-only.svg'
        },
        contract_metadata = {
            "" : "ipfs://QmaiAUj1FFNGYTu8rLBjc3eeN9cSKwaF8EGMBNDmhzPNFd",
        }
    )
)