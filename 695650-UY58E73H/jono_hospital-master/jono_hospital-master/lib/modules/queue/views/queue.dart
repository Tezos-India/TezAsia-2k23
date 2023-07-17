import 'package:flutter/material.dart';
import 'package:jono_hospital/common/constants/colors.dart';

class QueuePage extends StatelessWidget {
  static const String routeName = '/queuePage-page';
  const QueuePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 21),
          child: Column(
            children: [
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Today’s Queue',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  const Icon(Icons.more_vert)
                ],
              ),
              Expanded(
                child: Stack(
                  clipBehavior: Clip.none,
                  alignment: Alignment.center,
                  children: [
                    Container(
                      width: 40,
                      decoration: BoxDecoration(
                        color: AppColors.primaryColor.withOpacity(0.4),
                        borderRadius: BorderRadius.circular(24),
                      ),
                    ),
                    Positioned(
                      top: 30,
                      bottom: 30,
                      child: Column(
                        children: List.generate(
                          8,
                          (index) => QueueTile(isRight: index % 2 == 0),
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class QueueTile extends StatelessWidget {
  final bool isRight;
  const QueueTile({super.key, required this.isRight});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 30),
      child: Row(
        children: [
          isRight
              ? const SizedBox(
                  width: 100,
                )
              : SizedBox(
                  width: 100,
                  child: Padding(
                    padding: const EdgeInsets.only(right: 10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: const [
                        Text('10:00 AM'),
                      ],
                    ),
                  ),
                ),
          const CircleAvatar(),
          isRight
              ? const SizedBox(
                  width: 100,
                  child: Padding(
                    padding: EdgeInsets.only(left: 10),
                    child: Text('10:00 AM'),
                  ),
                )
              : const SizedBox(
                  width: 100,
                )
          // isRight
          //     ? const SizedBox(width: 100)
          //     : const SizedBox(width: 100, child: Text('10:00 AM')),
          // const CircleAvatar(),
          // !isRight
          //     ? const SizedBox(width: 100)
          //     : const SizedBox(width: 100, child: Text('10:00 AM')),
        ],
      ),
    );
  }
}
