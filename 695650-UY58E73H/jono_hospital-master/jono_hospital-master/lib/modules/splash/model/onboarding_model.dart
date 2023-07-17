class OnboardingModel {
  String? imageUrl;
  String? title;
  OnboardingModel({
    this.imageUrl,
    this.title,
  });

  static List<OnboardingModel> onboardingList = [
    OnboardingModel(
        imageUrl: 'assets/images/doctor1.png',
        title: 'Consult only with a doctor you trust'),
    OnboardingModel(
        imageUrl: 'assets/images/doctor2.png',
        title: 'Find a lot of specialist doctors in one place'),
    OnboardingModel(
        imageUrl: 'assets/images/doctor3.png',
        title: 'Get connect our Online Consultation'),
  ];
}
