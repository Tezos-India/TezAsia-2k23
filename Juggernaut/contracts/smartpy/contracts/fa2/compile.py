import smartpy as sp

Utils = sp.io.import_script_from_url("file:global_constants/utils.py").Utils
Fa2 = sp.io.import_script_from_url("file:contracts/fa2/contract.py").Fa2
Constants = sp.io.import_script_from_url("file:contracts/fa2/utils/constants.py")

utils = Utils()

sp.add_compilation_target(
    "fa2",
    Fa2(
        administrator = sp.address(utils.get_global_constant("admin")),
        minter = sp.address(utils.get_contract_address("minter")),
        metadata = Constants.CONTRACT_METADATA,
    ),
    flags = [["default_record_layout", "comb"]]
)
