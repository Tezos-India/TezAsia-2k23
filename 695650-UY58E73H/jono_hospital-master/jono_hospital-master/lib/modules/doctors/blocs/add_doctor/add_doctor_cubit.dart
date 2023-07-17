import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:jono_hospital/data/repositories/doctors/doctors_repository.dart';
import 'package:jono_hospital/data/services/local/shared_service.dart';
import 'package:jono_hospital/modules/doctors/models/doctor_profile.dart';

part 'add_doctor_state.dart';

class AddDoctorCubit extends Cubit<AddDoctorState> {
  final DoctorsRepository _doctorsRepository;
  final MySharedService _service = MySharedService();

  AddDoctorCubit({required DoctorsRepository doctorsRepository})
      : _doctorsRepository = doctorsRepository,
        super(AddDoctorState.initial());

  void addDoctor(DoctorProfile doctorProfile) async {
    emit(state.copyWith(isLoading: true));
    String? hospitalID = await _service.getSharedUserId();
    var response =
        await _doctorsRepository.addDoctor(doctorProfile, hospitalID!);
    response.when(
      (success) => emit(state.copyWith(isLoading: false, success: true)),
      (error) =>
          emit(state.copyWith(errorMessage: error.error, isLoading: false)),
    );
  }
}
