import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:jono_hospital/common/constants/colors.dart';
import 'package:jono_hospital/common/extensions/context_ext.dart';
import 'package:jono_hospital/modules/doctors/blocs/doctors/doctors_cubit.dart';
import 'package:jono_hospital/modules/doctors/models/doctor_profile.dart';
import 'package:jono_hospital/modules/modules.dart';

class DoctorsPage extends StatefulWidget {
  static const String routeName = '/doctorsPage-page';
  const DoctorsPage({Key? key}) : super(key: key);

  @override
  State<DoctorsPage> createState() => _DoctorsPageState();
}

class _DoctorsPageState extends State<DoctorsPage> {
  @override
  void initState() {
    super.initState();
    context.read<DoctorsCubit>().getDoctors();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: const Text('Your Doctors'),
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          return Future.delayed(const Duration(seconds: 1))
              .then((value) => context.read<DoctorsCubit>().getDoctors());
        },
        child: ListView(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: BlocConsumer<DoctorsCubit, DoctorsState>(
                listener: (context, state) {
                  if (state.errorMessage != null) {
                    context.showToast(message: state.errorMessage);
                  }
                },
                builder: (context, state) {
                  if (state.isLoading) {
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  }
                  return Column(
                    children: List.generate(
                      state.doctors.length,
                      (index) => InkWell(
                        onTap: () =>
                            Navigator.pushNamed(context, QueuePage.routeName),
                        child: DoctorCard(
                          doctor: state.doctors[index],
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pushNamed(context, AddNewDoctor.routeName);
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}

class DoctorCard extends StatelessWidget {
  final DoctorProfile doctor;
  const DoctorCard({super.key, required this.doctor});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(8),
      margin: const EdgeInsets.only(top: 10),
      height: 125,
      width: MediaQuery.of(context).size.width,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        border: Border.all(width: 2, color: AppColors.lightGrey),
      ),
      child: Row(
        children: [
          Image.network(doctor.photoUrl!),
          const SizedBox(width: 20),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Dr. ${doctor.name!}',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 5),
              Text(
                doctor.specialization!,
                style: Theme.of(context)
                    .textTheme
                    .labelLarge!
                    .copyWith(color: AppColors.darkGrey),
              ),
            ],
          )
        ],
      ),
    );
  }
}
