import 'package:flutter/material.dart';
import 'package:polyess/screens/home.dart';
import 'package:polyess/screens/wallet_connect.dart';
import 'package:polyess/services/wallet_service.dart';

class AuthWrapper extends StatefulWidget {
  const AuthWrapper({Key? key}) : super(key: key);

  @override
  _AuthWrapperState createState() => _AuthWrapperState();
}

class _AuthWrapperState extends State<AuthWrapper> {
  String? addr;

  @override
  Widget build(BuildContext context) {

    return FutureBuilder(
      future: WalletService().getSavedAddr(),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return Home(addr: snapshot.data.toString());
        } else {
          return WalletConnect();
        }
      },
    );
  }
}
