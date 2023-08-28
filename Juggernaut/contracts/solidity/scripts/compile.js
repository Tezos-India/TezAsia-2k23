// Import the Web3 library.
const { Web3 } = require("web3");

// Solc compiler
solc = require("solc");

// File reader
fs = require("fs");

const deployContract = function (contract) {
  try {
    // Define Tezos Ghostnet EVM rollup as provider.
    var web3 = new Web3("https://evm.ghostnet-evm.tzalpha.net");

    // Read the smart contract source-code from text file.
    file = fs.readFileSync(`contracts/${contract}.sol`).toString();

    console.log(`Compiling ${contract} contract...`);
    // Create input object for solidity compiler.
    var input = {
      language: "Solidity",
      sources: {
        [`${contract}.sol`]: {
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
    // Extract contract's ABI and Bytecode.
    ABI = output.contracts[`${contract}.sol`][contract].abi;
    bytecode =
      output.contracts[`${contract}.sol`][contract].evm.bytecode.object;

    fs.writeFileSync(`out/${contract}-abi.json`, JSON.stringify(ABI, null, 2));
    fs.writeFileSync(
      `out/${contract}-bytecode.json`,
      JSON.stringify(bytecode, null, 2)
    );
  } catch (error) {
    console.log("Error when deploying contract.");
    console.log(error);
  }
};

console.log(process.argv.slice(2));

for (let contract of process.argv.slice(2)) {
  deployContract(contract);
}
console.log("Done.");
