import 'package:flutter/material.dart';
import 'package:jono_hospital/common/constants/colors.dart';

extension ContextExt on BuildContext {
  void showToast({String? message, bool isError = false}) {
    ScaffoldMessenger.of(this).showSnackBar(
      SnackBar(
        content: Text(message!),
        behavior: SnackBarBehavior.floating,
        backgroundColor:
            isError ? AppColors.errorColor : AppColors.primaryColor,
      ),
    );
  }
}
