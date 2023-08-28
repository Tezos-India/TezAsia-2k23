// Import the Web3 library.
const { Web3 } = require("web3");

// Solc compiler
solc = require("solc");

// File reader
fs = require("fs");

const deployContract = async function () {
  try {
    // Define Tezos Ghostnet EVM rollup as provider.
    var web3 = new Web3("https://evm.ghostnet-evm.tzalpha.net");
    // var web3 = new Web3("http://127.0.0.1:8545");

    // Read the smart contract source-code from text file.
    file = fs.readFileSync("contracts/Bridge.sol").toString();
    console.log("Contract source code recieved");
    // Create input object for solidity compiler.
    var input = {
      language: "Solidity",
      sources: {
        "Bridge.sol": {
          content: file,
        },
      },

      settings: {
        outputSelection: {
          "*": {
            "*": ["*"],
          },
        },
      },
    };

    // Compile smart-contract and store result in "output" variable.
    var output = JSON.parse(solc.compile(JSON.stringify(input)));
    // console.log(JSON.stringify(output));
    console.log(Object.keys(output.contracts["Bridge.sol"]["Bridge"]));
    // Extract contract's ABI and Bytecode.
    const ABI = output.contracts["Bridge.sol"]["Bridge"].abi;
    const bytecode =
      output.contracts["Bridge.sol"]["Bridge"].evm.bytecode.object;

    // Instantiate a new smart contract object.
    const contract = new web3.eth.Contract(ABI);

    // contract.options.data = bytecode;

    contract.deploy({
      data: bytecode,
      arguments: [
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      ],
    });

    // Define private key and create a account object.
    let sk = "";
    let mainAccount = web3.eth.accounts.privateKeyToAccount(sk);

    // Create the transaction object.
    let tx = {
      gas: 22000,
      value: "0x00",
      data: ABI, // Contract's ABI.

      from: mainAccount.address, // fromAccount address.
      gasPrice: await web3.eth.getGasPrice(),
      gasLimit: 3000000,
    };

    // Sign the transaction, then send.
    await web3.eth.accounts
      .signTransaction(tx, sk)
      .then((signedTx) => {
        console.log(signedTx);
        return web3.eth
          .sendSignedTransaction(signedTx.rawTransaction)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    console.log("Error when deploying contract.");
    console.log(error);
  }
};

deployContract();
