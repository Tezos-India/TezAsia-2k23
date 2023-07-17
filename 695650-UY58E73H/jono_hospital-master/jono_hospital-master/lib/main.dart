// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

import 'package:jono_hospital/data/blocs/autocomplete/auto_complete_bloc.dart';
import 'package:jono_hospital/data/blocs/places/places_bloc.dart';
import 'package:jono_hospital/data/repositories/auth/auth_repository.dart';
import 'package:jono_hospital/data/repositories/doctors/doctors_repository.dart';
import 'package:jono_hospital/data/repositories/places/places_repository.dart';
import 'package:jono_hospital/data/services/local/shared_service.dart';
import 'package:jono_hospital/data/services/remote/firebase_auth_service.dart';
import 'package:jono_hospital/data/services/remote/firestore_service.dart';
import 'package:jono_hospital/modules/auth/blocs/auth/auth_bloc.dart';
import 'package:jono_hospital/modules/doctors/blocs/doctors/doctors_cubit.dart';

import './common/constants/theme.dart';
import './modules/modules.dart';
import './routes/router.dart';
import 'data/blocs/geolocation/geolocation_bloc.dart';
import 'data/repositories/geolocation/geolocation_repository.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  bool isLoggedIn = await MySharedService().getSharedUserId() != null;
  runApp(MyApp(
    isLoggedIn: isLoggedIn,
  ));
}

class MyApp extends StatelessWidget {
  final bool isLoggedIn;
  const MyApp({
    Key? key,
    required this.isLoggedIn,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiRepositoryProvider(
      providers: [
        RepositoryProvider(
          create: (_) => AuthRepository(
              auth: FirebaseAuth.instance,
              fireStoreService: FireStoreService()),
        ),
        RepositoryProvider(
          create: (_) => GeolocationRepository(),
        ),
        RepositoryProvider(
          create: (_) => PlacesRepository(),
        ),
        RepositoryProvider(
          create: (_) =>
              DoctorsRepository(fireStoreService: FireStoreService()),
        ),
      ],
      child: MultiBlocProvider(
        providers: [
          BlocProvider(
            create: (context) => GeolocationBloc(
              authService: FirebaseAuthService(),
              fireStoreService: FireStoreService(),
              geolocationRepository: context.read<GeolocationRepository>(),
            )..add(LoadGeolocationEvent()),
          ),
          BlocProvider(
            create: (context) => AuthBloc(
              authRepository: context.read<AuthRepository>(),
            ),
          ),
          BlocProvider(
            create: (context) => PlacesBloc(
              placesRepository: context.read<PlacesRepository>(),
            ),
          ),
          BlocProvider(
            create: (context) => AutoCompleteBloc(
              placesRepository: context.read<PlacesRepository>(),
            ),
          ),
          BlocProvider(
            create: (context) => DoctorsCubit(
                doctorsRepository: context.read<DoctorsRepository>()),
          ),
        ],
        child: ScreenUtilInit(
          designSize: const Size(360, 800),
          minTextAdapt: true,
          splitScreenMode: true,
          builder: (context, child) {
            return MaterialApp(
              debugShowCheckedModeBanner: false,
              title: "Jono Hospital",
              theme: appTheme(),
              onGenerateRoute: MyRouter.generateRoute,
              initialRoute:
                  isLoggedIn ? BottomPage.routeName : SplashPage.routeName,
            );
          },
        ),
      ),
    );
  }
}
