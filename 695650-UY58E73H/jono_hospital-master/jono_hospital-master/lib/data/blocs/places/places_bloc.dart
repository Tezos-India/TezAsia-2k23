import 'dart:async';

import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:jono_hospital/data/repositories/places/places_repository.dart';

import '../../models/place_model.dart';

part 'places_event.dart';
part 'places_state.dart';

class PlacesBloc extends Bloc<PlacesEvent, PlacesState> {
  final PlacesRepository _placesRepository;
  PlacesBloc({required PlacesRepository placesRepository})
      : _placesRepository = placesRepository,
        super(PlacesLoadingState()) {
    on<LoadPlaceEvent>(_handleLoadPlace);
  }

  FutureOr<void> _handleLoadPlace(
      LoadPlaceEvent event, Emitter<PlacesState> emit) async {
    emit(PlacesLoadingState());
    var result = await _placesRepository.getPlace(event.placeId);

    result.when(
      (success) => emit(PlacesLoadedState(place: success)),
      (error) => emit(PlacesErrorState(errorMessage: error.error!)),
    );
  }
}
