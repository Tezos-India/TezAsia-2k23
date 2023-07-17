import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';

@immutable
class UserProfileModel extends Equatable {
  final String? name;
  final String? email;
  final String? uid;
  const UserProfileModel({
    this.name,
    this.email,
    this.uid,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'name': name,
      'email': email,
      'uid': uid,
    };
  }

  factory UserProfileModel.fromMap(Map<String, dynamic> map) {
    return UserProfileModel(
      name: map['name'] != null ? map['name'] as String : null,
      email: map['email'] != null ? map['email'] as String : null,
      uid: map['uid'] != null ? map['uid'] as String : null,
    );
  }

  @override
  List<Object?> get props => [name, email, uid];
}

@immutable
class HospitalProfileModel extends Equatable {
  final String? name;
  final String? email;
  final String? uid;
  const HospitalProfileModel({
    this.name,
    this.email,
    this.uid,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'name': name,
      'email': email,
      'uid': uid,
    };
  }

  factory HospitalProfileModel.fromMap(Map<String, dynamic> map) {
    return HospitalProfileModel(
      name: map['name'] != null ? map['name'] as String : null,
      email: map['email'] != null ? map['email'] as String : null,
      uid: map['uid'] != null ? map['uid'] as String : null,
    );
  }

  @override
  List<Object?> get props => [name, email, uid];
}
