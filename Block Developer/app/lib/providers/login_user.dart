import 'package:polyess/models/api/login.dart';
import 'package:polyess/services/login_api.dart';

class LoginApiProvider {
  Login? userDetails;
  Future<Login?>? getMyUser(String address) async {
    return userDetails = await LoginApi().login(address);
  }
}
