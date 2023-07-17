class PlaceAutoComplete {
  final String description;
  final String placeId;
  PlaceAutoComplete({
    required this.description,
    required this.placeId,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'description': description,
      'placeId': placeId,
    };
  }

  factory PlaceAutoComplete.fromMap(Map<String, dynamic> map) {
    return PlaceAutoComplete(
      description: map['description'] as String,
      placeId: map['place_id'] as String,
    );
  }
}
