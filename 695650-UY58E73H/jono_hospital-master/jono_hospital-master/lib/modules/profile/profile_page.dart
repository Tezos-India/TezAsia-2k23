import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import 'package:jono_hospital/common/constants/colors.dart';
import 'package:jono_hospital/data/services/local/shared_service.dart';
import 'package:jono_hospital/modules/modules.dart';

class ProfilePage extends StatelessWidget {
  static const String routeName = '/profile-page';

  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primaryColor,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          PopupMenuButton(
              itemBuilder: (BuildContext context) => <PopupMenuItem<int>>[])
        ],
      ),
      body: Column(
        children: [
          Container(
              height: 270.h,
              color: Colors.transparent,
              child: Column(
                children: [
                  const ProfileImage(),
                  SizedBox(
                    height: 15.h,
                  ),
                  const Text(
                    "Profile Name",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  SizedBox(
                    height: 25.h,
                  ),
                  const HealthData(),
                ],
              )),
          const CustomBottomSheet(),
        ],
      ),
    );
  }
}

class ProfileImage extends StatelessWidget {
  const ProfileImage({super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        const CircleAvatar(
          radius: 40,
          backgroundImage: AssetImage('assets/images/profiledummy.png'),
        ),
        Positioned(
          left: 45.w,
          top: 50.h,
          child: const CircleAvatar(
            backgroundColor: Colors.white,
            radius: 15,
            child: Icon(
              size: 18,
              color: AppColors.primaryColor,
              Icons.camera_alt_outlined,
            ),
          ),
        )
      ],
    );
  }
}

class CustomBottomSheet extends StatelessWidget {
  const CustomBottomSheet({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 380.h,
      color: Colors.transparent,
      child: Container(
          decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(40.0),
                topRight: Radius.circular(40.0),
              )),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              InkWell(
                onTap: () =>
                    Navigator.pushNamed(context, DoctorsPage.routeName),
                child: optionsRow(
                    const Icon(
                      Icons.heart_broken_rounded,
                      color: Color(0xff199A8E),
                    ),
                    "My Doctors"),
              ),
              optionsRow(
                  const Icon(
                    Icons.notes,
                    color: Color(0xff199A8E),
                  ),
                  "Appointment"),
              optionsRow(
                  const Icon(
                    Icons.message_outlined,
                    color: Color(0xff199A8E),
                  ),
                  "FAQs"),
              Container(
                height: 70.h,
                padding: const EdgeInsets.only(left: 20, right: 15),
                child: Row(
                  children: [
                    const CircleAvatar(
                      backgroundColor: Color(0xffE8F3F1),
                      child: Icon(
                        Icons.error_outline,
                        color: Colors.red,
                      ),
                    ),
                    SizedBox(
                      width: 10.w,
                    ),
                    InkWell(
                      onTap: () {
                        MySharedService().removeSharedService();
                        Navigator.pushNamedAndRemoveUntil(
                            context, LandingPage.routeName, (route) => false);
                      },
                      child: const Text(
                        "Logout",
                        style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w500,
                            color: Colors.red),
                      ),
                    ),
                    const Spacer(),
                    const Icon(
                      Icons.arrow_forward_ios_sharp,
                    ),
                  ],
                ),
              )
            ],
          )),
    );
  }
}

Widget optionsRow(
  Icon iconz,
  String text,
) {
  return Container(
    height: 70.h,
    padding: const EdgeInsets.only(left: 20, right: 15),
    child: Row(
      children: [
        CircleAvatar(
          backgroundColor: const Color(0xffE8F3F1),
          child: iconz,
        ),
        SizedBox(
          width: 10.w,
        ),
        Text(
          text,
          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
        ),
        const Spacer(),
        const Icon(
          Icons.arrow_forward_ios_sharp,
        ),
      ],
    ),
  );
}

class HealthData extends StatelessWidget {
  const HealthData({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 25, right: 25),
      child: IntrinsicHeight(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            details(
                const Icon(
                  Icons.heart_broken_outlined,
                  color: Colors.white,
                  size: 45,
                ),
                "Heart Rate",
                "215bpm"),
            const VerticalDivider(
              color: Colors.white,
              width: 30,
              thickness: 1,
            ),
            details(
                const Icon(
                  Icons.fitbit_rounded,
                  size: 45,
                  color: Colors.white,
                ),
                "Calories",
                "715cal"),
            const VerticalDivider(
              color: Colors.white,
              width: 30,
              thickness: 1,
            ),
            details(
                const Icon(
                  Icons.sports_gymnastics,
                  size: 45,
                  color: Colors.white,
                ),
                "Weight",
                "103lbs"),
          ],
        ),
      ),
    );
  }

  details(Icon icon, String text, String text2) {
    return Padding(
      padding: const EdgeInsets.all(13),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          icon,
          Text(
            text,
            style: const TextStyle(fontSize: 10, color: Colors.white),
          ),
          Text(
            text2,
            style: const TextStyle(fontSize: 16, color: Colors.white),
          ),
        ],
      ),
    );
  }
}
