import 'package:jono_hospital/common/typedefs/typedefs.dart';
import 'package:jono_hospital/modules/doctors/models/doctor_profile.dart';

abstract class BaseDoctorsRepository {
  FutureVoid addDoctor(DoctorProfile profile, String hospitalID);
  FutureResult<List<DoctorProfile>> getDoctors(String hospitalID);
}
