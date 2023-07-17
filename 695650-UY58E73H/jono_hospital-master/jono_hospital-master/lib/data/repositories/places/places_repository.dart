import 'dart:convert' as convert;
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:jono_hospital/common/errors/result_error.dart';
import 'package:jono_hospital/common/typedefs/typedefs.dart';
import 'package:jono_hospital/data/models/place_autocomplete_model.dart';
import 'package:jono_hospital/data/models/place_model.dart';
import 'package:jono_hospital/data/repositories/places/base_places_repository.dart';
import 'package:multiple_result/multiple_result.dart';

class PlacesRepository implements BasePlacesRepository {
  final String key = 'AIzaSyDRpE59BtlvX146IQ9C8TJo1mqqqM2msXs';
  final String types = 'geocode';

  @override
  FutureResult<List<PlaceAutoComplete>> getAutoComplete(
      String searchInput) async {
    final String url =
        'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=$searchInput&components=country:in&key=$key';

    try {
      var response = await http.get(Uri.parse(url));
      var json = convert.jsonDecode(response.body);
      var result = json['predictions'] as List;

      return Success(
          result.map((place) => PlaceAutoComplete.fromMap(place)).toList());
    } on HttpException catch (e) {
      return Error(ResultError(error: e.message));
    }
  }

  @override
  FutureResult<Place> getPlace(String placeId) async {
    final String url =
        'https://maps.googleapis.com/maps/api/place/details/json?place_id=$placeId&key=$key';

    try {
      var response = await http.get(Uri.parse(url));
      var json = convert.jsonDecode(response.body);

      var result = json['result'] as Map<String, dynamic>;
      return Success(Place.fromMap(result));
    } on HttpException catch (e) {
      return Error(ResultError(error: e.message));
    }
  }
}
