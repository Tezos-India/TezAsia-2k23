class Wins {
  final String? gameid;
  final String? against;
  final String win = 'Win';

  Wins({this.gameid, this.against,});

  factory Wins.fromJson(Map<String, dynamic> json) {
    return Wins(gameid: json['gameId'], against: json['finalPlayer'],);
  }
}

class WinsList {
  final List<Wins>? wins;

  WinsList({this.wins});

  factory WinsList.fromJson(List<dynamic> json) {
    final winsList = json.map((i) => Wins.fromJson(i)).toList();
    return WinsList(
      wins: winsList,
    );
  }
}
