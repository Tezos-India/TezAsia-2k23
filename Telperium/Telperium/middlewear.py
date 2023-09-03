from web3 import Web3, EthereumTesterProvider
w3 = Web3(EthereumTesterProvider())
w3.isConnected()



provider_url = 'https://mainnet.infura.io/v3/'
w3 = Web3(Web3.HTTPProvider(provider_url))
w3.is_connected()