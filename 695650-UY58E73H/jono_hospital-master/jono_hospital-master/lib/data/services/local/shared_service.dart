import 'package:shared_preferences/shared_preferences.dart';

class MySharedService {
  //setters

  Future<bool> setSharedUserId(String id) async {
    final prefs = await SharedPreferences.getInstance();
    bool isDone = await prefs.setString('userID', id);
    return isDone;
  }

  //getters
  Future<String?> getSharedUserId() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('userID');
  }

  void removeSharedService() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
  }
}
