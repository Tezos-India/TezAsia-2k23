import React from "react";

const VisionSection = () => {
  return (
    <section className="bg-gray-300 py-20">
      <div className="container mx-auto text-center px-4 sm:px-0">
        <h2 className="text-4xl font-semibold mb-8">Our Vision</h2>

        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-gray-800 mb-6 leading-relaxed">
            {`"Imagine this- After hours of juggling tasks, your mind is buzzing,
            and you’re in desperate need of an escape. What could be better than
            diving into a world where every achievement, every win, feels deeply
            and uniquely yours? At our core, we’re more than just a gaming
            platform. We are a haven for cherished moments.`}
          </p>
          <p className="text-lg text-gray-800 mb-6 leading-relaxed">
            {`Whether it's that adrenaline rush from a hard-fought win or the
            quiet satisfaction of unlocking a new level, we amplify those
            experiences by giving them a personal touch. That’s where the magic
            of blockchain comes in. With us, when you achieve something, it’s
            not just another point on the board. It's a tangible reward,
            something you can call your own in the digital realm.`}
          </p>
          <p className="text-lg text-gray-800 leading-relaxed">
            {`With us, every game you play tells a story, your story. Whether
            you're battling it out in the leaderboards or just seeking a
            short-lived adventure, we ensure each click, each move counts.
            Because here, every moment is crafted keeping you in mind."`}
          </p>
          <p className="text-lg text-gray-600 mt-8 font-medium">
            - Founders of BLOCKS
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
