part of 'bottom_nav_bloc.dart';

abstract class BottomNavEvent extends Equatable {
  const BottomNavEvent();

  @override
  List<Object> get props => [];
}

class ChangePageEvent extends BottomNavEvent {
  final int pageIndex;

  const ChangePageEvent({required this.pageIndex});

  @override
  List<Object> get props => [pageIndex];
}
