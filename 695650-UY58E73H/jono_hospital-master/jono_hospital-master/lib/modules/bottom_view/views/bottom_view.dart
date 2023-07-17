import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:jono_hospital/common/constants/colors.dart';
import 'package:jono_hospital/modules/bottom_view/bloc/bottom_nav_bloc.dart';

import '../../modules.dart';

class BottomPage extends StatelessWidget {
  static const String routeName = '/bottom-page';
  const BottomPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) =>
          BottomNavBloc()..add(const ChangePageEvent(pageIndex: 0)),
      child: Scaffold(
        body: BlocBuilder<BottomNavBloc, BottomNavState>(
          builder: (context, state) {
            if (state is BottomNavCurrentState) {
              return IndexedStack(
                index: state.currentIndex,
                children: const [
                  HomeScreen(),
                  DoctorsPage(),
                  ProfilePage(),
                ],
              );
            }
            return const Text('Something went Wrong!!!');
          },
        ),
        bottomNavigationBar: const BottomNavBar(),
      ),
    );
  }
}

class BottomNavBar extends StatelessWidget {
  const BottomNavBar({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 66,
      color: AppColors.whiteColor,
      child: BlocBuilder<BottomNavBloc, BottomNavState>(
        builder: (context, state) {
          if (state is BottomNavCurrentState) {
            return Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: List.generate(
                3,
                (index) => InkWell(
                  onTap: () => context
                      .read<BottomNavBloc>()
                      .add(ChangePageEvent(pageIndex: index)),
                  child: SvgPicture.asset(
                    _buildIcon(index),
                    color: state.currentIndex == index
                        ? AppColors.primaryColor
                        : null,
                  ),
                ),
              ),
            );
          }
          return const Text('Something went Wrong');
        },
      ),
    );
  }

  String _buildIcon(int index) {
    switch (index) {
      case 0:
        return 'assets/svgs/Home.svg';
      case 1:
        return 'assets/svgs/doctor.svg';
      default:
        return 'assets/svgs/Profile.svg';
    }
  }
}
