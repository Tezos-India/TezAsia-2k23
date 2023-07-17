import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:jono_hospital/data/repositories/doctors/doctors_repository.dart';
import 'package:jono_hospital/data/services/local/shared_service.dart';
import 'package:jono_hospital/modules/doctors/models/doctor_profile.dart';

part 'doctors_state.dart';

class DoctorsCubit extends Cubit<DoctorsState> {
  final DoctorsRepository _doctorsRepository;
  final MySharedService _service = MySharedService();

  DoctorsCubit({required DoctorsRepository doctorsRepository})
      : _doctorsRepository = doctorsRepository,
        super(DoctorsState.initial());

  void getDoctors() async {
    emit(state.copyWith(isLoading: true));
    String? hospitalID = await _service.getSharedUserId();
    final result = await _doctorsRepository.getDoctors(hospitalID!);

    result.when(
      (success) => emit(state.copyWith(doctors: success, isLoading: false)),
      (error) => emit(
        state.copyWith(errorMessage: error.error, isLoading: false),
      ),
    );
  }
}
