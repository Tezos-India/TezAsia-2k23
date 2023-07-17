import 'dart:async';

import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:jono_hospital/data/repositories/places/places_repository.dart';

import '../../models/place_autocomplete_model.dart';

part 'auto_complete_event.dart';
part 'auto_complete_state.dart';

class AutoCompleteBloc extends Bloc<AutoCompleteEvent, AutoCompleteState> {
  final PlacesRepository _placesRepository;
  AutoCompleteBloc({required PlacesRepository placesRepository})
      : _placesRepository = placesRepository,
        super(AutoCompleteLoadingState()) {
    on<LoadAutoCompleteEvent>(_handleLoadAutoComplete);
  }

  FutureOr<void> _handleLoadAutoComplete(
      LoadAutoCompleteEvent event, Emitter<AutoCompleteState> emit) async {
    final response = await _placesRepository.getAutoComplete(event.searchInput);

    response.when(
      (success) => emit(AutoCompleteLoadedState(autocomplete: success)),
      (error) => emit(AutoCompleteErrorState(errorMessage: error.error!)),
    );
  }
}
