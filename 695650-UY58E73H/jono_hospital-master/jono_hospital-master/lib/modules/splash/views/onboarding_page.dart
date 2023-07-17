// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';

import 'package:jono_hospital/common/constants/colors.dart';
import 'package:jono_hospital/modules/splash/model/onboarding_model.dart';
import 'package:jono_hospital/modules/splash/views/landing_page.dart';

class OnboardingPage extends StatefulWidget {
  static const String routeName = '/onboarding-page';
  const OnboardingPage({Key? key}) : super(key: key);

  @override
  State<OnboardingPage> createState() => _OnboardingPageState();
}

class _OnboardingPageState extends State<OnboardingPage> {
  int currentIndex = 0;
  late PageController _pageController;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SizedBox.expand(
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                      onPressed: () => Navigator.pushNamedAndRemoveUntil(
                          context, LandingPage.routeName, (route) => false),
                      child: const Text('Skip')),
                ],
              ),
              Expanded(
                child: PageView.builder(
                  onPageChanged: (value) {
                    setState(() => currentIndex = value);
                  },
                  controller: _pageController,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: OnboardingModel.onboardingList.length,
                  itemBuilder: (context, index) {
                    var item = OnboardingModel.onboardingList[index];
                    return Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 27),
                      child: Column(
                        children: [
                          Image.asset(
                            item.imageUrl!,
                            scale: 4,
                          ),
                          const SizedBox(
                            height: 40,
                          ),
                          Text(
                            item.title!,
                            style: Theme.of(context)
                                .textTheme
                                .titleLarge!
                                .copyWith(
                                  color: AppColors.blackColor,
                                  fontWeight: FontWeight.w600,
                                  fontSize: 22,
                                ),
                          ),
                          const SizedBox(
                            height: 20,
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 27),
                child: Row(
                  children: [
                    PageIndicator(
                      currentIndex: currentIndex,
                    ),
                    const Spacer(),
                    TextButton(
                      onPressed: () {},
                      child: RoundButton(
                        onPressed: () {
                          if (currentIndex == 2) {
                            Navigator.pushNamedAndRemoveUntil(context,
                                LandingPage.routeName, (route) => false);
                            return;
                          }
                          _pageController.animateToPage(currentIndex + 1,
                              duration: const Duration(milliseconds: 400),
                              curve: Curves.easeIn);
                        },
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 40),
            ],
          ),
        ),
      ),
    );
  }
}

class RoundButton extends StatelessWidget {
  final Function()? onPressed;

  const RoundButton({Key? key, this.onPressed}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
          shape: const CircleBorder(),
          padding: const EdgeInsets.all(16),
          minimumSize: const Size(56, 56)),
      onPressed: onPressed,
      child: const Icon(Icons.arrow_forward),
    );
  }
}

class PageIndicator extends StatelessWidget {
  final int currentIndex;

  const PageIndicator({
    Key? key,
    required this.currentIndex,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: List.generate(3, (index) {
        return Container(
          margin: const EdgeInsets.only(left: 5),
          width: 16,
          height: 5,
          decoration: BoxDecoration(
            color: index <= currentIndex
                ? AppColors.primaryColor
                : AppColors.primaryColor.withOpacity(0.5),
            borderRadius: BorderRadius.circular(10),
          ),
        );
      }),
    );
  }
}
