const ethers = require("ethers");

const wallet = ethers.Wallet.createRandom();
console.log(wallet);
console.log(wallet.privateKey);

const pk = ethers.SigningKey.computePublicKey(wallet.privateKey);
console.log(pk);
