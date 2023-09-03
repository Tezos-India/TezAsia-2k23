from pytezos import pytezos
from datetime import datetime

Tezos = pytezos.using('https://ghostnet.ecadinfra.com')
contractAddress = ''

async def fetchDesiredTimestamp():
    contract = await Tezos.contract(contractAddress)
    storage = await contract.storage()
    isoTimestamp = storage['deadline']
    deadline = int(datetime.fromisoformat(isoTimestamp).timestamp())
    print('deadline     =  ' + str(deadline))
    return deadline

async def main():
    try:
        desiredTime = await fetchDesiredTimestamp()
        currentTimestamp = int(datetime.now().timestamp())
        print('current time  =  ' + str(currentTimestamp))
        if currentTimestamp >= desiredTime:
            await initializeOnMetaAPIs()  # Corrected to await the function
            print('Timestamp condition met. Initializing OnMeta APIs...')
        else:
            print('Timestamp condition not met yet.')
    except Exception as error:
        print(f'Error: {error}')

async def initializeOnMetaAPIs():  # Added async keyword
    print('Initializing OnMeta APIs...')
    # Add your code here to initialize the OnMeta APIs

import asyncio
asyncio.run(main())  # Use asyncio.run() to run the async main function
