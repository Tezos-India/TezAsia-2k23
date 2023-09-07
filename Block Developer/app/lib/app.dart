import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:polyess/models/style.dart';
import 'package:polyess/screens/auth_wrapper.dart';

class Polyess extends StatelessWidget {
  const Polyess({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Polyess',
      theme: ThemeData(
        scaffoldBackgroundColor: bgColor,
        textTheme: GoogleFonts.interTextTheme().copyWith(
          bodyText1: textStyle1,
        ),
        appBarTheme: AppBarTheme(
            backgroundColor: barColor, elevation: 1, titleSpacing: 20),
      ),
      home: AuthWrapper(),
    );
  }
}
