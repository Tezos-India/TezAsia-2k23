// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';

import 'package:jono_hospital/common/constants/colors.dart';

class CommonTextField extends StatelessWidget {
  final TextEditingController? controller;
  final String hintText;
  final Widget prefixIcon;
  final int? maxline;

  const CommonTextField({
    Key? key,
    this.controller,
    this.maxline = 1,
    required this.hintText,
    required this.prefixIcon,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      maxLines: maxline,
      decoration: InputDecoration(
          hintText: hintText,
          filled: true,
          fillColor: AppColors.lightGrey.withOpacity(.5),
          border: OutlineInputBorder(
            borderSide: BorderSide.none,
            borderRadius: BorderRadius.circular(24),
          ),
          iconColor: AppColors.primaryColor,
          focusedBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: AppColors.primaryColor),
            borderRadius: BorderRadius.circular(24),
          ),
          contentPadding: maxline != null
              ? const EdgeInsets.symmetric(
                  vertical: 10,
                )
              : null,
          prefixIcon: Padding(
            padding: const EdgeInsets.only(left: 8.0, right: 8),
            child: prefixIcon,
          )),
    );
  }
}
