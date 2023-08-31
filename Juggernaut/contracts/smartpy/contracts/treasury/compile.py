import smartpy as sp

Utils = sp.io.import_script_from_url("file:global_constants/utils.py").Utils
Treasury = sp.io.import_script_from_url("file:contracts/treasury/contract.py").Treasury
Constants = sp.io.import_script_from_url("file:contracts/treasury/utils/constants.py")

utils = Utils()


sp.add_compilation_target(
    "treasury",
    Treasury(
        admin = sp.address(utils.get_global_constant("admin")),
        manager = sp.address(utils.get_global_constant("manager")),
        fa12 = sp.address(utils.get_contract_address("ctez")),
        metadata = Constants.CONTRACT_METADATA
    ),
    flags = [["default_record_layout", "comb"]]
)