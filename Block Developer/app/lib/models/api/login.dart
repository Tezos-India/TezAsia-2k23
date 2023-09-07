import 'package:polyess/models/api/loses.dart';
import 'package:polyess/models/api/nft.dart';
import 'package:polyess/models/api/users.dart';
import 'package:polyess/models/api/wins.dart';

class Login {
  final bool? success;
  final Users? user;
  final WinsList? wins;
  final LossList? loses;
  final NftList? nfts;

  Login({
    this.success,
    this.user,
    this.wins,
    this.loses,
    this.nfts,
  });

  factory Login.fromJson(Map<String, dynamic> json) {
    return Login(
      success: json['success'],
      user: Users.fromJson(json['user']),
      wins: WinsList.fromJson(json['win']),
      loses: LossList.fromJson(json['loose']),
      nfts: NftList.fromJson(json['nfts']),
    );
  }

  factory Login.error() {
    return Login(
      success: false,
    );
  }
}
