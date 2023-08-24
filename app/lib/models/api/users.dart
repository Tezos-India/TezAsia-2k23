class Users {
  final String? username;
  final String? address;
  final int? tokenCount;
  final int? rank;

  Users({this.username, this.address, this.tokenCount, this.rank});

  factory Users.fromJson(Map<String, dynamic> json) {
    return Users(
      username: json['username'],
      address: json['address'],
      tokenCount: json['token'],
      rank: json['rank'],
    );
  }
}

class UsersList {
  final List<Users>? users;

  UsersList({this.users});

  factory UsersList.fromJson(List<dynamic> parsedJson) {
    final usersList = parsedJson.map((i) => Users.fromJson(i)).toList();
    return UsersList(
      users: usersList,
    );
  }
}
