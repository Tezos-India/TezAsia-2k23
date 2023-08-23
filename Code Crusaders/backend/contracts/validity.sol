// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Importing OpenZeppelin's ERC721 implementation for NFTs
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProductVerification is ERC721, Ownable {
    uint256 public tokenIdCounter;
    
    // Mapping from product ID to its corresponding token ID
    mapping(string => uint256) private productIdToTokenId;
    
    // Mapping from token ID to product details
    mapping(uint256 => Product) private products;
    
    struct Product {
        string productId;
        address manufacturer;
        string productDetails; // Additional details about the product
    }

    constructor() ERC721("ProductVerificationNFT", "PVNFT") {
        tokenIdCounter = 1;
    }

    function registerProduct(string memory _productId, string memory _productDetails) external onlyOwner {
        require(productIdToTokenId[_productId] == 0, "Product already registered");
        
        _mint(msg.sender, tokenIdCounter);
        products[tokenIdCounter] = Product({
            productId: _productId,
            manufacturer: msg.sender,
            productDetails: _productDetails
        });
        
        productIdToTokenId[_productId] = tokenIdCounter;
        tokenIdCounter++;
    }

    function getProductDetails(uint256 _tokenId) external view returns (string memory, address, string memory) {
        require(_exists(_tokenId), "Token ID does not exist");
        
        Product memory product = products[_tokenId];
        return (product.productId, product.manufacturer, product.productDetails);
    }
    
    function verifyProduct(string memory _productId, uint256 _tokenId) external view returns (bool) {
        return productIdToTokenId[_productId] == _tokenId;
    }
}
