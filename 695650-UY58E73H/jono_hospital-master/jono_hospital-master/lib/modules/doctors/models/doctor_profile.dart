import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';

@immutable
class DoctorProfile extends Equatable {
  final String? name;
  final String? doctorID;
  final String? photoUrl;
  final String? specialization;
  final int? noOfStar;
  const DoctorProfile({
    this.name,
    this.doctorID,
    this.photoUrl,
    this.specialization,
    this.noOfStar,
  });

  DoctorProfile copyWith({
    String? name,
    String? doctoeID,
    String? photoUrl,
    String? specialization,
    int? noOfStar,
  }) {
    return DoctorProfile(
      name: name ?? this.name,
      doctorID: doctoeID ?? this.doctorID,
      photoUrl: photoUrl ?? this.photoUrl,
      specialization: specialization ?? this.specialization,
      noOfStar: noOfStar ?? this.noOfStar,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'name': name,
      'doctoeID': doctorID,
      'photoUrl': photoUrl,
      'specialization': specialization,
      'noOfStar': noOfStar,
    };
  }

  factory DoctorProfile.fromMap(Map<String, dynamic> map) {
    return DoctorProfile(
      name: map['name'] != null ? map['name'] as String : null,
      doctorID: map['doctoeID'] != null ? map['doctoeID'] as String : null,
      photoUrl: map['photoUrl'] != null ? map['photoUrl'] as String : null,
      specialization: map['specialization'] != null
          ? map['specialization'] as String
          : null,
      noOfStar: map['noOfStar'] != null ? map['noOfStar'] as int : null,
    );
  }

  @override
  bool get stringify => true;

  @override
  List<Object?> get props {
    return [
      name,
      doctorID,
      photoUrl,
      specialization,
      noOfStar,
    ];
  }
}
