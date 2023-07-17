class Place {
  final String placeId;
  final String name;
  final double lat;
  final double lng;

  Place({
    required this.placeId,
    required this.name,
    required this.lat,
    required this.lng,
  });

  factory Place.fromMap(Map<String, dynamic> map) {
    return Place(
      placeId: map['place_id'] as String,
      name: map['formatted_address'] as String,
      lat: map['geometry']['location']['lat'] as double,
      lng: map['geometry']['location']['lng'] as double,
    );
  }
}
