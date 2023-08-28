import { Navbar } from "@/components/Navbar";
import { useEffect } from "react";
import React from "react";
import MultiLayerParallax from "@/components/exploreus/MultiLayerParallax";
import Profiles from "@/components/exploreus/TeamSection";
import { Footer } from "@/components/Footer";
import FAQPage from "@/components/exploreus/FAQPage";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import VisionSection from "@/components/exploreus/VisionSection";

const AboutUs = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="bg-gradient-to-br from-gray-900  to-gray-800 ">
      <Navbar />
      <hr className="border-t border-white h-2 my-2"></hr>

      <MultiLayerParallax />

      <div data-aos="fade-up-right" data-aos-duration="2000" className="p-16 ">
        <div className="text-4xl font-bold text-right text-white font-serif pb-8">
          Staking
        </div>
        <div className="flex items-center space-x-8">
          <Image src="/stake.png" alt="staking" width={300} height={500} />
          <div className="text-gray-300 text-justify flex-1">
            {`Welcome to a redefined era of staking. Gone are the days when
            staking was just a passive endeavor. Here, every stake you make is a
            move in a grand strategy game, a declaration of your skills and wit
            against fellow enthusiasts. At BLOCKS, staking is a
            challenge, a test of your conviction and foresight. Compete
            head-to-head with other players, stake your Tezos tokens, and
            witness the thrill of competition. It's not just about staking, it's
            about the strategy, the anticipation, and the exhilaration of
            victory. Every token you commit has the potential to not only
            strengthen our network but also to amplify your rewards when you
            emerge victorious. So, do you have what it takes to reign supreme in
            our competitive staking arena? Step in, challenge others, and let
            the games begin!`}
          </div>
        </div>
      </div>
      <div data-aos="fade-up-left" data-aos-duration="2000" className="p-16 ">
        <div className="text-4xl font-bold text-left text-white font-serif pb-8">
          Tezos Blockchain
        </div>
        <div className="flex items-center space-x-8">
          <div className="text-gray-300 text-justify flex-1">
            {`Tezos stands out in the crowded blockchain space with its adaptive
            nature. Its self-amending protocol ensures that it evolves by
            upgrading itself. Instead of forking the chain to adopt new
            proposals, the community can vote on amendments. This democratic
            model ensures that developers and token holders have a genuine say
            in the project's direction. We have integrated Tezos Blockchain in
            our projects to harness its adaptability, security, and robustness.
            With its on-chain governance and proof-of-stake consensus algorithm,
            users can participate, play, and make critical decisions about the
            project's future while ensuring the blockchain's integrity.`}
          </div>
          <Image src="/nft.png" alt="loading" width={350} height={150} />
        </div>
      </div>
      <div data-aos="fade-up-right" data-aos-duration="2000" className="p-16 ">
        <div className="text-4xl font-bold text-right text-white font-serif pb-8">
          {`NFT's`}
        </div>
        <div className="flex items-center space-x-8">
          <Image src="/astro2.png" alt="NFT" width={200} height={400} />
          <div className="text-gray-300 text-justify flex-1">
            {`Non-Fungible Tokens (NFTs) have revolutionized the digital asset
            space, providing verifiable uniqueness and ownership of digital
            items. On our platform, as you engage, play, and stake Tezos, you
            also stand a chance to win exclusive NFTs. These aren't just any
            digital tokens; they represent art, collectibles, or even unique
            in-game assets that can be traded or held as a digital asset with
            potential value appreciation. By integrating NFTs into our
            ecosystem, we're offering a multi-dimensional experience - allowing
            users to interact, transact, and win in ways they've never done
            before. Join us in this exhilarating journey of play, stake, and
            own!`}
          </div>
        </div>
      </div>
      <VisionSection />
      <Profiles />
      <FAQPage id="faq-section" />
      <Footer />
    </div>
  );
};
export default AboutUs;
