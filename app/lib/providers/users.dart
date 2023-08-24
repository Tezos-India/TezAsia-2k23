import 'package:polyess/models/api/users.dart';
import 'package:polyess/services/users_api.dart';

class UsersApiProvider {
  List<Users>? users;
  Future<List<Users>?> fetchUsers() async {
    return users = await UsersApi().fetchUsers();
  }
}
