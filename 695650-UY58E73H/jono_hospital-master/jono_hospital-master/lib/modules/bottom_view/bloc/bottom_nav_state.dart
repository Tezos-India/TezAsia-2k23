part of 'bottom_nav_bloc.dart';

abstract class BottomNavState extends Equatable {
  const BottomNavState();

  @override
  List<Object> get props => [];
}

class BottomNavInitial extends BottomNavState {}

class BottomNavCurrentState extends BottomNavState {
  final int currentIndex;

  const BottomNavCurrentState({
    required this.currentIndex,
  });

  @override
  List<Object> get props => [currentIndex];
}
