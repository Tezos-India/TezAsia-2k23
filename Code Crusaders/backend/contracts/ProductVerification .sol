// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProductVerification is ERC721, Ownable {
    uint256 public tokenIdCounter;

    mapping(string => uint256) private productIdToTokenId;
    mapping(uint256 => Product) private products;

    struct Product {
        string productId;
        address manufacturer;
        string productDetails;
        uint256 manufacturingDate;
        uint256 batchNumber;
        string[] supplyChain;
    }

    constructor() ERC721("ProductVerificationNFT", "PVNFT") {
        tokenIdCounter = 1;
    }

    function registerProduct(
        string memory _productId,
        string memory _productDetails,
        uint256 _manufacturingDate,
        uint256 _batchNumber
    ) external onlyOwner {
        require(productIdToTokenId[_productId] == 0, "Product already registered");

        _mint(msg.sender, tokenIdCounter);
        products[tokenIdCounter] = Product({
            productId: _productId,
            manufacturer: msg.sender,
            productDetails: _productDetails,
            manufacturingDate: _manufacturingDate,
            batchNumber: _batchNumber,
            supplyChain: new string[](0)
        });

        productIdToTokenId[_productId] = tokenIdCounter;
        tokenIdCounter++;
    }

    function addSupplyChainEntry(uint256 _tokenId, address _entity) external {
        require(_exists(_tokenId), "Token ID does not exist");
        require(ownerOf(_tokenId) == msg.sender || owner() == msg.sender, "Not authorized to add supply chain entry");

        products[_tokenId].supplyChain.push(addressToString(_entity));
    }

    function getProductDetails(uint256 _tokenId) external view returns (Product memory) {
        require(_exists(_tokenId), "Token ID does not exist");
        return products[_tokenId];
    }

    function verifyProduct(string memory _productId, uint256 _tokenId) external view returns (bool) {
        return productIdToTokenId[_productId] == _tokenId;
    }

    function updateProductDetails(
        uint256 _tokenId,
        string memory _newProductDetails,
        uint256 _newManufacturingDate,
        uint256 _newBatchNumber
    ) external {
        require(_exists(_tokenId), "Token ID does not exist");
        require(ownerOf(_tokenId) == msg.sender || owner() == msg.sender, "Not authorized to update");

        Product storage product = products[_tokenId];
        product.productDetails = _newProductDetails;
        product.manufacturingDate = _newManufacturingDate;
        product.batchNumber = _newBatchNumber;
    }

    function addressToString(address _addr) private pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3 + i * 2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }
        return string(str);
    }
}
