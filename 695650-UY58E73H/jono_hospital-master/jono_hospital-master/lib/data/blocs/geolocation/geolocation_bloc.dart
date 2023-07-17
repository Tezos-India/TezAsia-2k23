import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:jono_hospital/data/repositories/geolocation/geolocation_repository.dart';
import 'package:jono_hospital/data/services/remote/firebase_auth_service.dart';
import 'package:jono_hospital/data/services/remote/firestore_service.dart';

part 'geolocation_event.dart';
part 'geolocation_state.dart';

class GeolocationBloc extends Bloc<GeolocationEvent, GeolocationState> {
  final GeolocationRepository _geolocationRepository;
  final FireStoreService _fireStoreService;
  final FirebaseAuthService _authService;

  GeolocationBloc(
      {required GeolocationRepository geolocationRepository,
      required FireStoreService fireStoreService,
      required FirebaseAuthService authService})
      : _geolocationRepository = geolocationRepository,
        _fireStoreService = fireStoreService,
        _authService = authService,
        super(GeolocationLoadingState()) {
    on<GeolocationEvent>((event, emit) async {
      if (event is LoadGeolocationEvent) {
        final position = await _geolocationRepository.getCurrentLocation();
        final LatLng latlng = LatLng(position!.latitude, position.longitude);
        _fireStoreService.updateHospitalLocaltion(
            latlng, _authService.user!.uid);

        add(UpdateGeolocationEvent(position: position));
      } else if (event is UpdateGeolocationEvent) {
        emit(GeolocationLoadedState(position: event.position));
      }
    });
  }
}
