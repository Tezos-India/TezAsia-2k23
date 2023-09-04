import 'package:flutter/services.dart';
import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:web3dart/web3dart.dart';
import 'package:http/http.dart' as http;
import 'dart:typed_data';

const contractAddress = "0x7ffd8A206c64759C54A90F3584e50b3A22b674Da";
late http.Client webClient = http.Client();
late Web3Client ethclient = Web3Client(
    "https://rinkeby.infura.io/v3/752e6440e05b49e789eddfb9ca3e5c52", webClient);
const myAdress = "0x15923Daf6ac663991c5E7Ca41f2cFa67efdB1080";
var mydata;

class ETHHOME {
  Future<DeployedContract> loadContract() async {
    String abi = await rootBundle.loadString("contract/abi.json");

    final contract = DeployedContract(ContractAbi.fromJson(abi, "ethwalltrial"),
        EthereumAddress.fromHex(contractAddress));
    return contract;
  }

  Future<List<dynamic>> query(String function, List<dynamic> args) async {
    final contract = await loadContract();
    final ethFunction = contract.function(function);
    final result = await ethclient.call(
        sender: EthereumAddress.fromHex(myAdress),
        contract: contract,
        function: ethFunction,
        params: args);
    return result;
  }

  Future<void> buy_sell(token, from, to, amt) async {
    EthereumAddress addFrom = EthereumAddress.fromHex(from);
    EthereumAddress addTo = EthereumAddress.fromHex(to);

    List<dynamic> result = await query(
        "NFT_tran", [BigInt.from(token).toUnsigned(256), addFrom, addTo, amt]);
    mydata = result[0];
    log('data : $mydata');
  }
}
