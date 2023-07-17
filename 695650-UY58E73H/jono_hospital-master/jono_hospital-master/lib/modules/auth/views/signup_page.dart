import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:jono_hospital/common/constants/colors.dart';
import 'package:jono_hospital/common/extensions/context_ext.dart';
import 'package:jono_hospital/common/utils/utils.dart';
import 'package:jono_hospital/common/widgets/common_textfield.dart';
import 'package:jono_hospital/modules/auth/blocs/auth/auth_bloc.dart';
import 'package:jono_hospital/modules/modules.dart';

class SignupPage extends StatefulWidget {
  static const String routeName = '/signup-page';
  const SignupPage({Key? key}) : super(key: key);

  @override
  State<SignupPage> createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  late TextEditingController nameController;
  late TextEditingController emailController;
  late TextEditingController passwordController;

  bool isTermsAndCondition = false;

  @override
  void initState() {
    nameController = TextEditingController();
    emailController = TextEditingController();
    passwordController = TextEditingController();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 30),
          child: Column(
            children: [
              const SizedBox(height: 20),
              Row(
                children: [
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(Icons.arrow_back_ios),
                  ),
                ],
              ),
              const SizedBox(height: 44),
              SvgPicture.asset(
                'assets/svgs/logo.svg',
                color: AppColors.primaryColor,
                height: 96,
              ),
              const SizedBox(height: 40),
              Text(
                'Sign Up',
                style: Theme.of(context).textTheme.titleMedium!.copyWith(
                      fontWeight: FontWeight.bold,
                      fontSize: 22,
                    ),
              ),
              const SizedBox(height: 16),
              Text(
                'Let’s get your financial account back on track.',
                style: Theme.of(context).textTheme.titleMedium!.copyWith(
                      // fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
              ),
              const SizedBox(height: 40),
              CommonTextField(
                controller: nameController,
                hintText: 'Enter Hospital Name',
                prefixIcon: const Icon(Icons.local_hospital_rounded),
              ),
              const SizedBox(height: 16),
              CommonTextField(
                controller: emailController,
                hintText: 'Enter your email',
                prefixIcon: const Icon(Icons.email_outlined),
              ),
              const SizedBox(height: 16),
              CommonTextField(
                controller: passwordController,
                hintText: 'Enter your password',
                prefixIcon: const Icon(Icons.lock_outline_rounded),
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Checkbox(
                    activeColor: AppColors.primaryColor,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(4),
                    ),
                    value: isTermsAndCondition,
                    onChanged: (value) {
                      setState(() => isTermsAndCondition = value!);
                    },
                  ),
                  SizedBox(
                    width: 280,
                    child: Text.rich(
                      TextSpan(
                        text: 'I agree to the JONO ',
                        children: [
                          TextSpan(
                              text: 'Terms of Service ',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodyMedium!
                                  .copyWith(
                                    color: AppColors.primaryColor,
                                  ),
                              children: [
                                TextSpan(
                                  text: 'and ',
                                  style:
                                      Theme.of(context).textTheme.bodyMedium!,
                                  children: [
                                    TextSpan(
                                      text: 'Privacy Policy',
                                      style: Theme.of(context)
                                          .textTheme
                                          .bodyMedium!
                                          .copyWith(
                                            color: AppColors.primaryColor,
                                          ),
                                    ),
                                  ],
                                )
                              ]),
                        ],
                      ),
                      maxLines: 2,
                    ),
                  )
                ],
              ),
              const SizedBox(height: 32),
              BlocConsumer<AuthBloc, AuthState>(
                listener: (context, state) {
                  if (state is AuthErrorState) {
                    context.showToast(message: state.message, isError: true);
                  }
                  if (state is AuthSignedInState) {
                    Navigator.pushNamedAndRemoveUntil(
                        context, BottomPage.routeName, (route) => false);
                  }
                },
                builder: (context, state) {
                  log(state.toString());
                  return ElevatedButton(
                    onPressed: () {
                      context.read<AuthBloc>().add(
                            SignUpEvent(
                              email: emailController.text.trim(),
                              password: passwordController.text.trim(),
                              name: nameController.text.trim(),
                            ),
                          );
                    },
                    child: state is AuthLoadingState
                        ? CommonUtilities.loading()
                        : const Text('Sign Up'),
                  );
                },
              ),
              const SizedBox(height: 32),
            ],
          ),
        ),
      )),
    );
  }
}
