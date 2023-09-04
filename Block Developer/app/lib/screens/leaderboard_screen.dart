import 'package:flutter/material.dart';
import 'package:polyess/models/style.dart';
import 'package:polyess/providers/users.dart';
import 'package:polyess/screens/wallet_connect.dart';
import 'package:polyess/services/wallet_service.dart';

class LeaderBoardSceen extends StatelessWidget {
  const LeaderBoardSceen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    UsersApiProvider userProvider = UsersApiProvider();
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
            initialData: [],
            future: userProvider.fetchUsers(),
            builder: (BuildContext context, AsyncSnapshot snapshot) {
              if (snapshot.hasData) {
                return Padding(
                  padding: const EdgeInsets.only(top: 20, left: 20, right: 20),
                  child: ListView.builder(
                    itemCount: (userProvider.users?.length ?? 0) == 0
                        ? 0
                        : userProvider.users!.length - 1,
                    itemBuilder: (context, index) {
                      return Card(
                        elevation: 0,
                        color: Color(0xFF242A38),
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: ListTile(
                            title: Padding(
                              padding: const EdgeInsets.only(left: 7),
                              child: Text(
                                userProvider.users![index].username!,
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 23,
                                ),
                                textAlign: TextAlign.left,
                              ),
                            ),
                            leading: Container(
                              height: 45,
                              width: 45,
                              decoration: BoxDecoration(
                                  color: textColor,
                                  borderRadius: BorderRadius.circular(5)),
                              child: Center(
                                child: Text(
                                  '${index + 1}',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 20,
                                  ),
                                ),
                              ),
                            ),
                            trailing: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Text(
                                  userProvider.users![index].rank.toString(),
                                  style: TextStyle(
                                      color: Colors.orange[100], fontSize: 25),
                                ),
                                SizedBox(
                                  width: 5,
                                ),
                                Text(
                                  'Points',
                                  style: TextStyle(
                                      color: Colors.orange[100],
                                      fontWeight: FontWeight.bold,
                                      fontSize: 10),
                                )
                              ],
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                );
              }
              return Center(child: CircularProgressIndicator());
            }),
      ),
    );
  }
}
