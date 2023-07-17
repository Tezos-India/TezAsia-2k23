import 'dart:async';

import 'package:equatable/equatable.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:jono_hospital/data/repositories/auth/auth_repository.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final AuthRepository _authRepository;
  AuthBloc({required AuthRepository authRepository})
      : _authRepository = authRepository,
        super(AuthInitial()) {
    on<SignInEvent>(_handleSignInEvent);
    on<SignUpEvent>(_handleSignUpEvent);
    on<SignOutEvent>(_handleSignOutEvent);
  }

  FutureOr<void> _handleSignInEvent(
      SignInEvent event, Emitter<AuthState> emit) async {
    emit(AuthLoadingState());
    var response =
        await _authRepository.loginViaEmail(event.email, event.password);

    response.when(
      (success) => emit(AuthSignedInState(user: success)),
      (error) => emit(
        AuthErrorState(message: error.error!),
      ),
    );
  }

  FutureOr<void> _handleSignOutEvent(
      SignOutEvent event, Emitter<AuthState> emit) {}

  FutureOr<void> _handleSignUpEvent(
      SignUpEvent event, Emitter<AuthState> emit) async {
    emit(AuthLoadingState());
    var response =
        await _authRepository.signUp(event.name, event.email, event.password);

    response.when(
      (success) => emit(AuthSignedInState(user: success)),
      (error) => emit(
        AuthErrorState(message: error.error!),
      ),
    );
  }
}
