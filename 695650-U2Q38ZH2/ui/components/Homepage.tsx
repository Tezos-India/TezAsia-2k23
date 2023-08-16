import React, { useEffect } from "react";
import { Card } from "./Card";
import { Footer } from "./Footer";
import Image from "next/image";
import Link from "next/link";

// Homepage Component
export const Homepage = () => {
  useEffect(() => {
    const root = document.documentElement;

    const handleScroll = () => {
      const y = 1 + (window.scrollY || window.pageYOffset);
      root.style.setProperty("--gradient-percent", y * 4 + "px");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      // Cleanup the event listener on component unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={" min-h-screen bg-gray-900"}>
      {/* Header content */}
      <div
        className={
          " flex justify-between items-center px-16 py-16 bg-gradient-to-br from-black to-gray-900"
        }
      >
        <div>
          <h1 className="text-7xl text-white font-semibold">
            The Future of Online Gaming
          </h1>
          <p className="text-4xl text-purple-500 pt-6">
            Win, Earn, and own with BLOCKS Gaming.
          </p>
          <p className="text-xl text-gray-400 pt-6">
            Play thrilling games, stake your Tezos, and win big. Discover a
            world where gaming pays off, literally! Experience the unique twist
            of winning real Tezos rewards and minting your own NFTs.
          </p>
        </div>
        <div className="relative z-10">
          <Image
            src="/toys.png"
            alt="Gaming Image"
            width={1200}
            height={1000}
          />
        </div>
      </div>

      <div className="waves-container">
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "black", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "gray", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(0, 0, 0, 0.7)"
            />{" "}
            {/* Color of header with reduced opacity */}
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(147, 112, 219, 0.5)"
            />{" "}
            {/* Middle wave, reduced opacity of purple color */}
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(219, 112, 147, 0.3)"
            />{" "}
            {/* Another middle wave, reduced opacity of pinkish purple color */}
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="7"
              fill="rgba(219, 112, 199, 1)"
            />{" "}
            {/* Color of card component, purpleish pinkish */}
          </g>
        </svg>
      </div>

      <div
        className="pb-16 px-16"
        style={{ backgroundColor: "rgba(219, 112, 199, 1)" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <Card title="Play to Earn" description="Stake Tezos and win" />
          <Card
            title="Tezos Blockchain"
            description="Our games are powered by Tezos ensuring transparency, fairness, and security."
          />
          <Card title="NFT Integration" description="Unlock incredible NFTs." />
          <Card
            title="Users"
            description="Join millions of users and beyond."
          />
        </div>
        <div className="flex justify-center">
          <Link href="/aboutus">
            <button className="text-white text-3xl bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 transition duration-300 ease-in-out transform hover:translate-y-1 px-10 py-3.5 font-semibold rounded-full shadow-xl">
              Explore More!
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row justify-between items-center px-16 pb-16 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="text-center lg:text-left">
          <h2 className="text-6xl text-white font-semibold mb-6">
            ChessUnleashed
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Embrace the thrill of traditional chess with a modern twist. Each
            chess piece is tied to a unique NFT, adding a captivating new
            dimension to your gameplay.
          </p>

          <button className="text-white text-3xl bg-gradient-to-br from-gray-800 to-blue-900 hover:from-gray-700 hover:to-blue-800 transition-all duration-300 ease-in-out transform hover:translate-y-1 px-10 py-3.5 font-semibold rounded-full shadow-2xl">
            Play Now
          </button>

        </div>
        <div className="relative mt-12 lg:mt-0 z-10">
          <Image src="/2.png" alt="Chess Image" width={462} height={437} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
