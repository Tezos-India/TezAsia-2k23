import 'package:firebase_auth/firebase_auth.dart';
import 'package:jono_hospital/common/typedefs/typedefs.dart';

abstract class BaseAuthRepository {
  FutureResult<User> loginViaEmail(String email, String password);
  FutureResult<User> signUp(String name, String email, String password);
  Future<void> signOut();
}
