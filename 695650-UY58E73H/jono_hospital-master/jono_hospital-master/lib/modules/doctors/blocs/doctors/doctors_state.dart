part of 'doctors_cubit.dart';

@immutable
class DoctorsState extends Equatable {
  final bool isLoading;
  final String? errorMessage;
  final List<DoctorProfile> doctors;
  const DoctorsState({
    required this.isLoading,
    this.errorMessage,
    this.doctors = const [],
  });

  factory DoctorsState.initial() => const DoctorsState(
        isLoading: false,
      );

  @override
  List<Object?> get props => [isLoading, errorMessage, doctors];

  DoctorsState copyWith({
    bool? isLoading,
    String? errorMessage,
    List<DoctorProfile>? doctors,
  }) {
    return DoctorsState(
      isLoading: isLoading ?? this.isLoading,
      errorMessage: errorMessage ?? this.errorMessage,
      doctors: doctors ?? this.doctors,
    );
  }

  @override
  bool get stringify => true;
}
