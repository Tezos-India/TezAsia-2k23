import 'package:flutter/material.dart';
import 'package:polyess/models/api/users.dart';
import 'package:polyess/models/style.dart';
import 'package:polyess/providers/login_user.dart';
import 'package:polyess/screens/wallet_connect.dart';
import 'package:polyess/services/wallet_service.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key, required this.addr}) : super(key: key);
  final String addr;

  @override
  Widget build(BuildContext context) {
    LoginApiProvider loginProvider = LoginApiProvider();
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Text('Polyess'),
          actions: [
            IconButton(
                onPressed: () {
                  WalletService().clearData();
                  Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                      builder: (context) => WalletConnect(),
                    ),
                  );
                },
                icon: Icon(
                  Icons.logout,
                  color: Colors.white,
                ))
          ],
        ),
        body: FutureBuilder(
          initialData: Users(),
          future: loginProvider
              .getMyUser('0x596F08aDAa76889161A98c9Bb79869e7f9518C70'),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return Padding(
                padding: const EdgeInsets.only(top: 20, left: 30, right: 30),
                child: SingleChildScrollView(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          Text(
                            loginProvider.userDetails?.user?.username ?? '--',
                            style: TextStyle(
                              color: textColor,
                              fontSize: 50,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                      SizedBox(
                        height: 20,
                      ),
                      Container(
                        decoration: BoxDecoration(
                            color: Color(0xFFD1996D),
                            borderRadius: BorderRadius.circular(10)),
                        child: Padding(
                          padding: const EdgeInsets.all(12.0),
                          child: Text(
                            addr.substring(0, 5) +
                                '...' +
                                addr.substring(addr.length - 4),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 17,
                            ),
                          ),
                        ),
                      ),
                      SizedBox(
                        height: 35,
                      ),
                      Padding(
                        padding: const EdgeInsets.only(left: 15, right: 15),
                        child: Column(
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text(
                                      loginProvider.userDetails?.user?.rank
                                              .toString() ??
                                          '..',
                                      style: TextStyle(
                                        color: textColor,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20,
                                      ),
                                    ),
                                    SizedBox(
                                      height: 1,
                                    ),
                                    Text(
                                      'Points',
                                      style: TextStyle(
                                          color: Colors.white70, fontSize: 15),
                                    ),
                                  ],
                                ),
                                Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text(
                                      (loginProvider.userDetails?.wins?.wins
                                                  ?.length
                                                  .toString() ??
                                              '..') +
                                          ' / ' +
                                          (loginProvider.userDetails?.loses
                                                  ?.loses?.length
                                                  .toString() ??
                                              '..'),
                                      style: TextStyle(
                                        color: textColor,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20,
                                      ),
                                    ),
                                    SizedBox(
                                      height: 1,
                                    ),
                                    Text(
                                      'Win/Loss',
                                      style: TextStyle(
                                          color: Colors.white70, fontSize: 15),
                                    ),
                                  ],
                                ),
                                Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text(
                                      loginProvider
                                              .userDetails?.user?.tokenCount
                                              .toString() ??
                                          '..',
                                      style: TextStyle(
                                        color: textColor,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 20,
                                      ),
                                    ),
                                    SizedBox(
                                      height: 1,
                                    ),
                                    Text(
                                      'Tokens',
                                      style: TextStyle(
                                          color: Colors.white70, fontSize: 15),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                            SizedBox(
                              height: 15,
                            ),
                          ],
                        ),
                      ),
                      SizedBox(
                        height: 40,
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'NFTs',
                            textAlign: TextAlign.left,
                            style: TextStyle(
                                color: Colors.white70,
                                fontWeight: FontWeight.bold,
                                fontSize: 20),
                          ),
                          Text(
                            loginProvider.userDetails?.nfts?.nft?.length
                                    .toString()
                                    .toString() ??
                                '..',
                            style: TextStyle(
                              color: Colors.white70,
                              fontWeight: FontWeight.bold,
                              fontSize: 20,
                            ),
                          )
                        ],
                      ),
                      SizedBox(
                        height: 25,
                      ),
                      Container(
                        height: 200,
                        child: ListView.builder(
                          scrollDirection: Axis.horizontal,
                          itemCount:
                              loginProvider.userDetails?.nfts?.nft?.length ?? 0,
                          itemBuilder: (context, index) {
                            return Padding(
                              padding: const EdgeInsets.only(right: 10),
                              child: Container(
                                //width: 300,
                                child: loginProvider.userDetails == null
                                    ? CircularProgressIndicator()
                                    : ClipRRect(
                                        borderRadius: BorderRadius.circular(15),
                                        child: Image.network(loginProvider
                                                .userDetails!.nfts!.nft
                                                ?.elementAt(index)
                                                .image ??
                                            ''),
                                      ),
                              ),
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              );
            }
            return CircularProgressIndicator();
          },
        ),
      ),
    );
  }
}
