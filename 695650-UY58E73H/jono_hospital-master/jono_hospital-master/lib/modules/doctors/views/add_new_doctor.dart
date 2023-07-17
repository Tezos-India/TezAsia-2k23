import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:jono_hospital/common/extensions/context_ext.dart';
import 'package:jono_hospital/common/widgets/common_textfield.dart';
import 'package:jono_hospital/data/repositories/doctors/doctors_repository.dart';
import 'package:jono_hospital/modules/doctors/blocs/add_doctor/add_doctor_cubit.dart';
import 'package:jono_hospital/modules/doctors/blocs/doctors/doctors_cubit.dart';

import 'package:jono_hospital/modules/doctors/models/doctor_profile.dart';
import 'package:uuid/uuid.dart';

class AddNewDoctor extends StatefulWidget {
  static const String routeName = '/addNewDoctor-page';
  const AddNewDoctor({Key? key}) : super(key: key);

  @override
  State<AddNewDoctor> createState() => _AddNewDoctorState();
}

class _AddNewDoctorState extends State<AddNewDoctor> {
  late TextEditingController nameController;
  late TextEditingController specController;
  late TextEditingController descController;

  @override
  void initState() {
    super.initState();
    nameController = TextEditingController();
    specController = TextEditingController();
    descController = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) =>
          AddDoctorCubit(doctorsRepository: context.read<DoctorsRepository>()),
      child: Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: const Text('Add New Doctors'),
        ),
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: SingleChildScrollView(
            child: Column(
              children: [
                const SizedBox(
                  height: 40,
                ),
                const CircleAvatar(
                  radius: 40,
                ),
                const SizedBox(
                  height: 20,
                ),
                CommonTextField(
                  hintText: 'Enter Doctor\'s Name',
                  prefixIcon: const Icon(Icons.person),
                  controller: nameController,
                ),
                const SizedBox(
                  height: 20,
                ),
                CommonTextField(
                  hintText: 'Enter Doctor\'s specialization',
                  prefixIcon: const Icon(Icons.supervised_user_circle_sharp),
                  controller: specController,
                ),
                const SizedBox(
                  height: 20,
                ),
                CommonTextField(
                  maxline: 5,
                  hintText: 'Enter Doctor\'s Description',
                  prefixIcon: const SizedBox(),
                  controller: descController,
                ),
              ],
            ),
          ),
        ),
        floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
        floatingActionButton: BlocConsumer<AddDoctorCubit, AddDoctorState>(
          listener: (context, state) {
            if (state.errorMessage != null) {
              context.showToast(message: state.errorMessage, isError: true);
            }
            if (state.success) {
              Navigator.pop(context);
              context.showToast(message: 'Added');
            }
          },
          builder: (context, state) {
            return Padding(
              padding: const EdgeInsets.all(8.0),
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                ),
                onPressed: () {
                  context.read<AddDoctorCubit>().addDoctor(
                        DoctorProfile(
                          doctorID: const Uuid().v4(),
                          name: nameController.text.trim(),
                          noOfStar: 0,
                          photoUrl:
                              'https://www.freepnglogos.com/uploads/doctor-png/doctor-bulk-billing-doctors-chapel-hill-health-care-medical-3.png',
                          specialization: specController.text.trim(),
                        ),
                      );
                  nameController.clear();
                  specController.clear();
                  descController.clear();

                  context.read<DoctorsCubit>().getDoctors();
                },
                child: state.isLoading
                    ? const CircularProgressIndicator()
                    : const Text('Add'),
              ),
            );
          },
        ),
      ),
    );
  }
}
