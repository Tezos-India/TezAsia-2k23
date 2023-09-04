import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:polyess/models/api/login.dart';
import 'package:polyess/models/api/users.dart';
import 'package:polyess/models/constants.dart';

class LoginApi {
  final url = apiUrl + '/login';

  Future<Login>? login(String address) async {
    final response = await http.post(
      Uri.parse(url),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'address': address,
      }),
    );
    if (response.statusCode == 200) {
      return Login.fromJson(jsonDecode(response.body));
    } else if (response.statusCode != 200) {
      return Login.error();
    } else {
      print(response.body);
      throw Exception('Failed to load user');
    }
  }
}
