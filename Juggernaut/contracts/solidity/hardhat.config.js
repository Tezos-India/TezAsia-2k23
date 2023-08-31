require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    etherlinkTestnet: {
      url: "https://evm.ghostnet-evm.tzalpha.net",
      gas: 22000,
      from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      accounts: [
        "",
      ],
    },
  },
};
