import smartpy as sp
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

class ProductVerification(sp.Contract):
    def __init__(self):
        self.init(
            tokenIdCounter=1,
            productIdToTokenId={},
            products={},
        )

    @sp.entry_point
    def registerProduct(self, params):
        sp.verify(~self.data.productIdToTokenId.contains(params.productId), message="Product already registered")

        token_id = self.data.tokenIdCounter
        self.data.tokenIdCounter += 1

        self.data.productIdToTokenId[params.productId] = token_id

        product = sp.record(
            productId=params.productId,
            manufacturer=sp.sender,
            productDetails=params.productDetails,
            manufacturingDate=params.manufacturingDate,
            batchNumber=params.batchNumber,
            supplyChain=[],
        )
        self.data.products[token_id] = product

    @sp.entry_point
    def addSupplyChainEntry(self, params):
        product = self.data.products[params.tokenId]
        sp.verify(sp.sender == product.manufacturer, "Not authorized to add supply chain entry")

        product.supplyChain.push(params.entity)

    @sp.entry_point
    def updateProductDetails(self, params):
        product = self.data.products[params.tokenId]
        sp.verify(sp.sender == product.manufacturer, "Not authorized to update")

        product.productDetails = params.newProductDetails
        product.manufacturingDate = params.newManufacturingDate
        product.batchNumber = params.newBatchNumber

@sp.add_test(name="test")
def test():
    scenario = sp.test_scenario()

    scenario.h1("Product Verification")
    c1 = ProductVerification()
    scenario += c1

    scenario.h2("Register Product")
    scenario += c1.registerProduct(
        productId="123",
        productDetails="Sample Product",
        manufacturingDate=1630339200,
        batchNumber=1,
    ).run(sender=sp.address("tz1..."))

    scenario.h2("Add Supply Chain Entry")
    scenario += c1.addSupplyChainEntry(tokenId=1, entity=sp.address("tz2...")).run(sender=sp.address("tz1..."))

    scenario.h2("Update Product Details")
    scenario += c1.updateProductDetails(
        tokenId=1,
        newProductDetails="Updated Product",
        newManufacturingDate=1632777600,
        newBatchNumber=2,
    ).run(sender=sp.address("tz1..."))

    scenario.h2("Get Product Details")
    scenario += c1.getProductDetails(1)

    scenario.h2("Verify Product")
    scenario += c1.verifyProduct(productId="123", tokenId=1)

# Helper function to get
def get_contract_storage(contract_address):
    storage_url = f"https://api.ghostnet.tzkt.io/v1/contracts/{contract_address}/storage"
    response = requests.get(storage_url)
    if response.status_code == 200:
        storage_data = response.json()
        return storage_data
    else:
        return None

# Helper function to get the AES key using the storage data and RSA decryption
def get_aes_key(storage_data, sha_aadhar, rsa_private_key):
    public_keys = storage_data['public_keys']
    rsa_encrypted_cipher_key = json.loads(public_keys[sha_aadhar])['RSAencryptedcipherKey']
    # Replace this with your RSA decryption logic
    decrypted_aes_key = rsa_private_key.decrypt(rsa_encrypted_cipher_key)
    return decrypted_aes_key

def main():
  
    contract_address = os.getenv('CONTRACT_ADDRESS')
    
    # Replace these placeholders with actual values
    sha_aadhar =  os.getenv('SHA_AADHAR')
    rsa_private_key =  os.getenv('RSA_PRIVATE_KEY')
    
    storage_data = get_contract_storage(contract_address)
    if storage_data:
        aes_key = get_aes_key(storage_data, sha_aadhar, rsa_private_key)
        print("Decrypted AES Key:", aes_key)
    else:
        print("Failed to fetch contract storage")

if __name__ == "__main__":
    main()
