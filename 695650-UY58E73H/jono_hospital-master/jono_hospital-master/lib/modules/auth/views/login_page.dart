import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:jono_hospital/common/constants/colors.dart';
import 'package:jono_hospital/common/extensions/context_ext.dart';
import 'package:jono_hospital/common/utils/utils.dart';
import 'package:jono_hospital/common/widgets/common_textfield.dart';
import 'package:jono_hospital/modules/auth/blocs/auth/auth_bloc.dart';

import '../../modules.dart';

class LoginPage extends StatefulWidget {
  static const String routeName = '/login-page';
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  late TextEditingController emailController;
  late TextEditingController passwordController;

  @override
  void initState() {
    super.initState();
    emailController = TextEditingController();
    passwordController = TextEditingController();
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
                'Log In',
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
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    onPressed: () {},
                    child: const Text('Forgot Password?'),
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
                  return ElevatedButton(
                    onPressed: () {
                      context.read<AuthBloc>().add(
                            SignInEvent(
                              email: emailController.text.trim(),
                              password: passwordController.text.trim(),
                            ),
                          );
                    },
                    child: state is AuthLoadingState
                        ? CommonUtilities.loading()
                        : const Text('Login'),
                  );
                },
              )
            ],
          ),
        ),
      )),
    );
  }
}
