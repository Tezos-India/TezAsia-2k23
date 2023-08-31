// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

/*
 * @dev This contract is a bridge between Etherlink (Tezos EVM rollup) and Tezos
 */
contract Bridge {
    address public owner;
    address public manager;
    uint256 public totalBalance;

    /*
     * @dev Emitted when funds are locked in the contract
     * @param sender The address of the sender
     * @param receiver The tezos address of the receiver
     * @param amount The amount of funds locked
     */
    event FundsLocked(address sender, string receiver, uint256 amount);

    constructor(address _owner, address _manager) {
        owner = _owner;
        manager = _manager;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier onlyOwnerOrManager() {
        require(
            msg.sender == owner || msg.sender == manager,
            "Only the owner or manager can call this function"
        );
        _;
    }

    function setOwner(address newOwner) external onlyOwner {
        owner = newOwner;
    }

    function setManager(address newManager) external onlyOwner {
        manager = newManager;
    }

    function lock(string memory receiver) external payable {
        totalBalance += msg.value;
        emit FundsLocked(msg.sender, receiver, msg.value);
    }

    function withdraw(uint256 amount) external onlyOwnerOrManager {
        require(amount <= totalBalance, "Insufficient balance");

        totalBalance -= amount;
        payable(owner).transfer(amount);
    }
}
