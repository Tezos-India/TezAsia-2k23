import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:polyess/models/api/users.dart';
import 'package:polyess/models/constants.dart';

class UsersApi {
  final url = apiUrl + '/users' + '?sort=-rank';

  Future<List<Users>?> fetchUsers() async {
    final response = await http.get(Uri.parse(url));

    if (response.statusCode == 200) {
      return UsersList.fromJson(jsonDecode(response.body)).users;
    } else {
      throw Exception('Failed to load users');
    }
  }
}
