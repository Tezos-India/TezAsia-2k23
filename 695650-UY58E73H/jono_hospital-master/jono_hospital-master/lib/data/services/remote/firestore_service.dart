import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:jono_hospital/data/models/profile_model.dart';
import 'package:jono_hospital/modules/doctors/models/doctor_profile.dart';

class FireStoreService {
  final FirebaseFirestore _firebaseFirestore = FirebaseFirestore.instance;

  Future<void> createHospitalProfile(
      HospitalProfileModel hospitalProfileModel) async {
    await _firebaseFirestore
        .collection('hospitals')
        .doc(hospitalProfileModel.uid)
        .set(
          hospitalProfileModel.toMap(),
        );
  }

  Future<void> updateHospitalLocaltion(LatLng latLng, String uid) async {
    await _firebaseFirestore.collection('hospitals').doc(uid).update({
      'lat': latLng.latitude,
      'lng': latLng.longitude,
    });
  }

  Future<void> addDoctor(DoctorProfile doctorProfile, String hospitalID) async {
    await _firebaseFirestore
        .collection('hospitals')
        .doc(hospitalID)
        .collection('doctors')
        .doc()
        .set(doctorProfile.toMap());
  }

  Future<List<DoctorProfile>> getDoctors(String hospitalID) async {
    List<DoctorProfile> doctors = [];
    final doctorRef = await _firebaseFirestore
        .collection('hospitals')
        .doc(hospitalID)
        .collection('doctors')
        .get();

    for (var element in doctorRef.docs) {
      doctors.add(DoctorProfile.fromMap(element.data()));
    }

    return doctors;
  }
}
