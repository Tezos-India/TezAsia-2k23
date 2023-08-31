import { Footer } from "@/components/Footer";
import LargeCard from "@/components/LargeCard";
import { Navbar } from "@/components/Navbar";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { particlesOptions } from "@/config/Particles";
import { Engine } from "tsparticles-engine";

const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const particlesInit = async (main: Engine) => {
    console.log(main);
    await loadFull(main);
  };

  const games = [
    {
      title: "Chess",
      short_desc: "Strategize, Challenge, and Checkmate!",
      long_desc:
        "Chess is a two-player, abstract strategy game that simulates medieval warfare on an 8x8 board. Players command an army filled with various pieces, each with its unique moves – from the cunning knight's L-shaped move to the powerful queen's dominance over the board. The game's objective is simple yet challenging: trap the opposing king in a position known as 'checkmate,' where escape is impossible. As you immerse yourself, you'll not only enjoy the thrill of the battle but also enhance your cognitive abilities, improve memory, and foster strategic thinking. Whether you're a beginner or a grandmaster, every game is a new journey. Dive in and let the timeless duel begin!",
      review_stars: "4.5",
      max_users: "12k",
      img: "/chess_thumb.jpg",
      link: "/Game",
      tags: ["strategy", "multiplayer"],
    },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      <Particles
        id="particles-here"
        init={particlesInit}
        options={particlesOptions as any}
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className="relative z-10 pointer-events-none">
        <Navbar />
        <hr className="border-t border-white"></hr>

        <div className="flex flex-col justify-center items-center py-12 px-4 md:px-20 lg:px-40 ">
          <div className="flex flex-row ">
            <div className="pt-20">
              <h1 className="text-5xl text-white mb-6 font-bold">
                Game Library
              </h1>
              <p className="text-xl text-purple-500 mb-12">
                Discover games and let the adventure begin!
              </p>
            </div>

            <Image src="/library-man.png" alt="" width={200} height={125} />
          </div>

          {/* Search bar */}
          <div className="w-full mb-6 relative pointer-events-auto">
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded text-gray-900 bg-gradient-to-br from-pink-800 to-purple-700 placeholder-white shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <span className="absolute right-4 top-1/2  -translate-y-1/2">
              <FontAwesomeIcon icon={faSearch} color="white" />
            </span>
          </div>

          {games
            .filter((game) =>
              game.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((game) => (
              <LargeCard
                key={game.title}
                title={game.title}
                short_desc={game.short_desc}
                long_desc={game.long_desc}
                review_stars={game.review_stars}
                max_users={game.max_users}
                img={game.img}
                link={game.link}
                tags={game.tags} // Added tags
              />
            ))}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Library;
