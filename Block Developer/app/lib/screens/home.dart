import 'package:flutter/material.dart';
import 'package:polyess/models/style.dart';
import 'package:polyess/screens/home_screen.dart';
import 'package:polyess/screens/leaderboard_screen.dart';
import 'package:polyess/screens/market_screen.dart';

class Home extends StatefulWidget {
  const Home({Key? key, required String addr})
      : _addr = addr,
        super(key: key);

  final String _addr;

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  PageController pageController = PageController();
  int _selectedIndex = 0;

  void onTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
    pageController.jumpToPage(index);
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        bottomNavigationBar: BottomNavigationBar(
          items: [
            BottomNavigationBarItem(
              icon: Icon(Icons.home_rounded),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.leaderboard),
              label: 'Leader Board',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.shopping_basket_rounded),
              label: 'Market Place',
            ),
          ],
          selectedItemColor: textColor,
          unselectedItemColor: Colors.grey,
          currentIndex: _selectedIndex,
          onTap: onTapped,
          elevation: 0,
          type: BottomNavigationBarType.fixed,
          backgroundColor: barColor,
        ),
        body: PageView(
          controller: pageController,
          children: [
            HomeScreen(addr: widget._addr),
            LeaderBoardSceen(),
            MarketPlaceScreen(),
          ],
          physics: NeverScrollableScrollPhysics(),
        ),
      ),
    );
  }
}
