part of 'places_bloc.dart';

abstract class PlacesEvent extends Equatable {
  const PlacesEvent();

  @override
  List<Object> get props => [];
}

class LoadPlaceEvent extends PlacesEvent {
  final String placeId;

  LoadPlaceEvent({
    required this.placeId,
  });

  @override
  List<Object> get props => [placeId];
}
