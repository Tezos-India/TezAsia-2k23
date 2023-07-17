// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:async';
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

import 'package:jono_hospital/common/constants/app_constants.dart';
import 'package:jono_hospital/common/constants/colors.dart';
import 'package:jono_hospital/data/blocs/autocomplete/auto_complete_bloc.dart';
import 'package:jono_hospital/data/blocs/geolocation/geolocation_bloc.dart';
import 'package:jono_hospital/data/blocs/places/places_bloc.dart';
import 'package:jono_hospital/modules/home/views/info_widget.dart';

class HomeScreen extends StatefulWidget {
  static const String routeName = "/home";

  const HomeScreen({Key? key}) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final Completer<GoogleMapController> mapcompleter =
      Completer<GoogleMapController>();

  GoogleMapController? _mapController;

  StreamSubscription? _mapIdleSubscription;
  InfoWidgetRoute? _infoWidgetRoute;

  PointObject point = PointObject(
    child: const Text('Lorem Ipsum'),
    location: const LatLng(47.6, 8.8796),
  );

  late String silverMapStyle;
  BitmapDescriptor markerIcon = BitmapDescriptor.defaultMarker;
  BitmapDescriptor currentmMarkerIcon = BitmapDescriptor.defaultMarker;
  Set<Marker> markers = <Marker>{};
  Set<Circle> circles = <Circle>{};

  late double offsetY, offsetX;

  @override
  void initState() {
    _loadMapStyles();
    super.initState();
  }

  Future _loadMapStyles() async {
    silverMapStyle =
        await rootBundle.loadString('assets/map_style/silver.json');
  }

  Future<void> addCustomIcon() async {
    var icon = await BitmapDescriptor.fromAssetImage(
      const ImageConfiguration(size: Size(100, 100)),
      "assets/svgs/blood-drop.png",
    );
    var currentIcon = await BitmapDescriptor.fromAssetImage(
      const ImageConfiguration(size: Size(100, 100)),
      "assets/svgs/Location.png",
    );

    setState(() {
      markerIcon = icon;
      currentmMarkerIcon = currentIcon;
    });
  }

  _onTap(PointObject point, BuildContext context) async {
    final RenderBox renderBox = context.findRenderObject()! as RenderBox;
    Rect itemRect = renderBox.localToGlobal(Offset.zero) & renderBox.size;

    _infoWidgetRoute = InfoWidgetRoute(
      height: 150,
      child: point.child,
      buildContext: context,
      textStyle: const TextStyle(
        fontSize: 14,
        color: Colors.black,
      ),
      mapsWidgetSize: itemRect,
      barrierLabel: '',
    );

    await _mapController!.animateCamera(
      CameraUpdate.newCameraPosition(
        CameraPosition(
          target: LatLng(
            point.location.latitude - 0.0001,
            point.location.longitude,
          ),
          zoom: 15,
        ),
      ),
    );
    await _mapController!.animateCamera(
      CameraUpdate.newCameraPosition(
        CameraPosition(
          target: LatLng(
            point.location.latitude,
            point.location.longitude,
          ),
          zoom: 15,
        ),
      ),
    );
  }

  Future<void> addCurrentLocation(LatLng position) async {
    markers.add(
      Marker(
        markerId: const MarkerId('Current'),
        position: position,
        icon: currentmMarkerIcon,
      ),
    );
    circles.add(
      Circle(
        circleId: const CircleId('Current'),
        center: position,
        radius: 200,
        strokeWidth: 1,
        strokeColor: AppColors.primaryColor,
      ),
    );
  }

  Future<void> addHosipitalMarker() async {
    for (var element in AppConstants.hospitalsList) {
      markers.add(
        Marker(
          markerId:
              MarkerId('Marker${AppConstants.hospitalsList.indexOf(element)}'),
          position: element,
          icon: markerIcon,
          consumeTapEvents: true,
          onTap: () {
            _onTap(
                PointObject(
                    child: InkWell(
                      onTap: () {
                        log(element.toString());
                      },
                      child: Container(
                        width: double.infinity,
                        color: AppColors.primaryColor,
                        child: Column(
                          children: [
                            Image.network(
                              'https://static.vecteezy.com/system/resources/thumbnails/004/493/181/small/hospital-building-for-healthcare-background-illustration-with-ambulance-car-doctor-patient-nurses-and-medical-clinic-exterior-free-vector.jpg',
                              height: 100,
                            ),
                            const Text('Hospital'),
                          ],
                        ),
                      ),
                    ),
                    location: element),
                context);
          },
          // infoWindow: InfoWindow(title: 'Hospital $element'),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BlocListener<PlacesBloc, PlacesState>(
        listener: (context, state) {
          if (state is PlacesLoadedState) {
            _mapController!.animateCamera(
              CameraUpdate.newCameraPosition(
                CameraPosition(
                  target: LatLng(state.place.lat, state.place.lng),
                  zoom: 15,
                ),
              ),
            );
          }
        },
        child: BlocBuilder<GeolocationBloc, GeolocationState>(
          builder: (context, state) {
            if (state is GeolocationLoadingState) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            }

            if (state is GeolocationLoadedState) {
              return Stack(
                children: [
                  GoogleMap(
                    onMapCreated: (controller) async {
                      _mapController = controller;
                      mapcompleter.complete(controller);
                      controller.setMapStyle(silverMapStyle);
                      await addCustomIcon();
                      await addHosipitalMarker();
                      await addCurrentLocation(LatLng(
                        state.position.latitude,
                        state.position.longitude,
                      ));
                    },
                    initialCameraPosition: CameraPosition(
                      target: LatLng(
                        state.position.latitude,
                        state.position.longitude,
                      ),
                      zoom: 14.4746,
                    ),
                    onCameraMove: (newPosition) {
                      _mapIdleSubscription?.cancel();
                      _mapIdleSubscription =
                          Future.delayed(const Duration(milliseconds: 150))
                              .asStream()
                              .listen((_) {
                        if (_infoWidgetRoute != null) {
                          Navigator.of(context, rootNavigator: true)
                              .push(_infoWidgetRoute!)
                              .then<void>(
                            (newValue) {
                              _infoWidgetRoute = null;
                            },
                          );
                        }
                      });
                    },
                    markers: markers,
                    circles: circles,
                    // myLocationButtonEnabled: false,
                  ),
                  Positioned(
                    top: 60,
                    left: 30,
                    right: 30,
                    child: SizedBox(
                      // height: 50,
                      width: MediaQuery.of(context).size.width * 0.9,
                      child: Column(
                        children: [
                          SearchField(
                            onChanged: (value) {
                              context.read<AutoCompleteBloc>().add(
                                    LoadAutoCompleteEvent(searchInput: value),
                                  );
                            },
                          ),
                          BlocBuilder<AutoCompleteBloc, AutoCompleteState>(
                            builder: (context, state) {
                              if (state is AutoCompleteLoadingState) {
                                return const SizedBox();
                              } else if (state is AutoCompleteLoadedState) {
                                return Container(
                                  margin: const EdgeInsets.all(8),
                                  height: state.autocomplete.isNotEmpty
                                      ? 300
                                      : null,
                                  color: state.autocomplete.isNotEmpty
                                      ? AppColors.primaryColor.withOpacity(0.6)
                                      : Colors.transparent,
                                  child: ListView.builder(
                                    shrinkWrap: true,
                                    itemCount: state.autocomplete.length,
                                    itemBuilder: (context, int index) {
                                      return ListTile(
                                        title: Text(
                                          state.autocomplete[index].description,
                                          style: const TextStyle(
                                              color: Colors.white),
                                        ),
                                        onTap: () {
                                          context.read<PlacesBloc>().add(
                                                LoadPlaceEvent(
                                                  placeId: state
                                                      .autocomplete[index]
                                                      .placeId,
                                                ),
                                              );
                                          context.read<AutoCompleteBloc>().add(
                                              const LoadAutoCompleteEvent());
                                          // controller.clear();
                                          FocusScope.of(context).unfocus();
                                        },
                                      );
                                    },
                                  ),
                                );
                              }
                              return const Center(
                                  child: Text('Something went Wrong !!!!'));
                            },
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              );
            }
            return const Center(
              child: Text('Something went Wrong !!!!'),
            );
          },
        ),
      ),
    );
  }
}

class PointObject {
  final Widget child;
  final LatLng location;

  PointObject({required this.child, required this.location});
}

class SearchField extends StatelessWidget {
  final Function(String)? onChanged;

  const SearchField({
    Key? key,
    this.onChanged,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      onChanged: onChanged,
      decoration: InputDecoration(
        hintText: 'Search Hospital',
        fillColor: AppColors.whiteColor,
        filled: true,
        contentPadding: const EdgeInsets.symmetric(
          vertical: 10,
          horizontal: 20,
        ),
        prefixIcon: const Icon(Icons.search),
        border: OutlineInputBorder(
          borderSide: BorderSide.none,
          borderRadius: BorderRadius.circular(24),
        ),
      ),
    );
  }
}
