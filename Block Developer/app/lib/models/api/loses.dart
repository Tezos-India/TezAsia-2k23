class Loses {
  final String? gameid;
  final String? against;
  final String loss = 'Lost';

  Loses({this.gameid, this.against});

  factory Loses.fromJson(Map<String, dynamic> json) {
    return Loses(
      gameid: json['gameId'],
      against: json['finalPlayer']
    );
  }
}

class LossList {
  final List<Loses>? loses;

  LossList({this.loses});

  factory LossList.fromJson(List<dynamic> json) {
    final lossList = json.map((i) => Loses.fromJson(i)).toList();
    return LossList(
      loses: lossList,
    );
  }
}
