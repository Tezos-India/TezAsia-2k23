// file to create your app theme and stuff

import 'package:flutter/material.dart';
import './colors.dart';

ThemeData appTheme() {
  return ThemeData(
    floatingActionButtonTheme: const FloatingActionButtonThemeData(
        backgroundColor: AppColors.primaryColor),
    appBarTheme: const AppBarTheme(
      elevation: 0,
      backgroundColor: AppColors.primaryColor,
    ),
    primaryColor: AppColors.primaryColor,
    outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
      foregroundColor: AppColors.primaryColor,
      side: const BorderSide(
        color: AppColors.primaryColor,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(32),
      ),
      minimumSize: const Size(375, 56),
      elevation: 0,
    )),
    textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
      foregroundColor: AppColors.primaryColor,
    )),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.primaryColor,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(32),
        ),
        minimumSize: const Size(375, 56),
        elevation: 0,
      ),
    ),
    colorScheme:
        ColorScheme.fromSwatch().copyWith(secondary: AppColors.whiteColor),
  );
}
