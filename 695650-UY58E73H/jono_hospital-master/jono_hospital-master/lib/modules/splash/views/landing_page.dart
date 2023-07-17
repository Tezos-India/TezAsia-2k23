import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:jono_hospital/common/constants/colors.dart';
import 'package:jono_hospital/modules/modules.dart';

class LandingPage extends StatelessWidget {
  static const String routeName = '/landing-page';
  const LandingPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SizedBox.expand(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 40),
          child: Column(
            children: [
              const Spacer(),
              SvgPicture.asset(
                'assets/svgs/logo.svg',
                color: AppColors.primaryColor,
                height: 96,
              ),
              const SizedBox(height: 40),
              Text(
                'Let’s get started!',
                style: Theme.of(context).textTheme.titleLarge!.copyWith(
                      fontWeight: FontWeight.bold,
                      fontSize: 22,
                    ),
              ),
              const SizedBox(height: 12),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 22),
                child: Text(
                  'Login to enjoy the features we’ve provided, and stay healthy!',
                  style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                        fontSize: 16,
                        wordSpacing: 2,
                      ),
                  textAlign: TextAlign.center,
                ),
              ),
              const SizedBox(height: 50),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 22),
                child: ElevatedButton(
                  onPressed: () =>
                      Navigator.pushNamed(context, LoginPage.routeName),
                  child: const Text('Login'),
                ),
              ),
              const SizedBox(height: 16),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 22),
                child: OutlinedButton(
                  onPressed: () =>
                      Navigator.pushNamed(context, SignupPage.routeName),
                  child: const Text('Sign Up'),
                ),
              ),
              const Spacer(),
            ],
          ),
        ),
      ),
    );
  }
}
