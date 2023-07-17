// ignore_for_file: public_member_api_docs, sort_constructors_first

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:jono_hospital/modules/doctors/models/doctor_profile.dart';
import 'package:multiple_result/multiple_result.dart';

import 'package:jono_hospital/common/errors/result_error.dart';
import 'package:jono_hospital/common/typedefs/typedefs.dart';
import 'package:jono_hospital/data/services/remote/firestore_service.dart';

import 'base_doctors_repository.dart';

class DoctorsRepository implements BaseDoctorsRepository {
  final FireStoreService fireStoreService;
  DoctorsRepository({
    required this.fireStoreService,
  });

  @override
  FutureVoid addDoctor(DoctorProfile profile, String hospitalID) async {
    try {
      return Success(await fireStoreService.addDoctor(profile, hospitalID));
    } on FirebaseException catch (e) {
      return Error(ResultError(
        error: e.message,
        stackTrace: e.stackTrace,
      ));
    }
  }

  @override
  FutureResult<List<DoctorProfile>> getDoctors(String hospitalID) async {
    try {
      final response = await fireStoreService.getDoctors(hospitalID);

      return Success(response);
    } on FirebaseException catch (e) {
      return Error(ResultError(
        error: e.message,
        stackTrace: e.stackTrace,
      ));
    }
  }
}
