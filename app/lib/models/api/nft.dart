class Nft {
  final String? image;

  Nft({this.image});

  factory Nft.fromJson(Map<String, dynamic> json) {
    return Nft(
      image: json['image'],
    );
  }
}

class NftList {
  final List<Nft>? nft;

  NftList({this.nft});

  factory NftList.fromJson(List<dynamic> json) {
    final nftList = json.map((i) => Nft.fromJson(i)).toList();
    return NftList(
      nft: nftList,
    );
  }
}
