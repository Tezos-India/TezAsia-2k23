import smartpy as sp
import os

Utils = sp.io.import_script_from_url("file:global_constants/utils.py").Utils
NETWORK = os.environ.get("NETWORK", Utils.Networks.TESTNET)
utils = Utils()


############### Constants ###############
CONTRACT_NAME = "treasury"
DUMMY_CONTRACT_METADATA = sp.utils.metadata_of_url("ipfs://Qm1..")

MAX_PERCENT = 100_00

CONTRACT_METADATA = sp.utils.metadata_of_url("ipfs://Qm...")


############### Testnet only constants ###############
MANAGERS = sp.set([
    sp.address(utils.get_address("anshit")),
])


############### Mainnet only constants ###############
if NETWORK == Utils.Networks.MAINNET:
    MANAGERS = sp.set([
    ])