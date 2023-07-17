part of 'geolocation_bloc.dart';

abstract class GeolocationState extends Equatable {
  const GeolocationState();

  @override
  List<Object?> get props => [];
}

class GeolocationLoadingState extends GeolocationState {}

class GeolocationLoadedState extends GeolocationState {
  final Position position;

  const GeolocationLoadedState({required this.position});

  @override
  List<Object?> get props => [position];
}

class GeolocationErrorState extends GeolocationState {}
