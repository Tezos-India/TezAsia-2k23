import 'package:flutter/services.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class WalletService {
  final platform = MethodChannel('polyess.wallet/eth');
  final storage = FlutterSecureStorage();
  String? walletAddr;

  getAddress(String seed) async {
    walletAddr = await platform
        .invokeMethod("getWallet", <String, String>{'seed': seed});
    secureSave(seed, walletAddr);
    return walletAddr;
  }

  secureSave(String seed, String? addr) async {
    await storage.write(key: 'savedSeed', value: seed);
    await storage.write(key: 'savedAddr', value: addr);
  }

  getSavedAddr() async => await storage.read(key: 'savedAddr');

  clearData() async => await storage.deleteAll();
}
