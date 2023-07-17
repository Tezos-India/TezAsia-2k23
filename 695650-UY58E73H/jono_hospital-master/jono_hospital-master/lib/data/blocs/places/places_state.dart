// ignore_for_file: public_member_api_docs, sort_constructors_first
part of 'places_bloc.dart';

abstract class PlacesState extends Equatable {
  const PlacesState();

  @override
  List<Object> get props => [];
}

class PlacesLoadingState extends PlacesState {}

class PlacesLoadedState extends PlacesState {
  final Place place;

  const PlacesLoadedState({
    required this.place,
  });

  @override
  List<Object> get props => [place];
}

class PlacesErrorState extends PlacesState {
  final String errorMessage;
  const PlacesErrorState({
    required this.errorMessage,
  });

  @override
  List<Object> get props => [errorMessage];
}
