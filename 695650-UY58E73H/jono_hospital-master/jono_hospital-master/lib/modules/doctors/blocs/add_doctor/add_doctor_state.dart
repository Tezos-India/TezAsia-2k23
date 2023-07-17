part of 'add_doctor_cubit.dart';

@immutable
class AddDoctorState extends Equatable {
  final bool isLoading;
  final String? errorMessage;
  final bool success;

  const AddDoctorState({
    required this.isLoading,
    this.errorMessage,
    this.success = false,
  });

  factory AddDoctorState.initial() => const AddDoctorState(
        isLoading: false,
      );

  AddDoctorState copyWith({
    bool? isLoading,
    bool? success,
    String? errorMessage,
  }) {
    return AddDoctorState(
      isLoading: isLoading ?? this.isLoading,
      success: success ?? this.success,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }

  @override
  List<Object?> get props => [isLoading, errorMessage, success];
}
