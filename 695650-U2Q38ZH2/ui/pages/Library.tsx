import { Footer } from "@/components/Footer";
import LargeCard from "@/components/LargeCard";
import { Navbar } from "@/components/Navbar";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";

const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const games = [
    {
      title: "Chess",
      short_desc: "Collect, Play, and Conquer...",
      long_desc: "This is the long description of the game...",
      review_stars: "4.5",
      max_users: "12k",
      img: "/chess_thumb.jpg",
      link: "/Game",
      tags: ["strategy", "multiplayer"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      <Navbar />
      <hr className="border-t border-white"></hr>

      <div className="flex flex-col justify-center items-center py-12 px-4 md:px-20 lg:px-40">
        <div className="flex flex-row">
          <div className="pt-20">
            <h1 className="text-5xl text-white mb-6 font-bold">Game Library</h1>
            <p className="text-xl text-gray-300 mb-12">
              Discover games and let the adventure begin!
            </p>
          </div>

          <Image src="/library-man.png" alt="" width={200} height={125} />
        </div>

        {/* Search bar */}
        <div className="w-full mb-6 relative">
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded text-gray-900 bg-gradient-to-br from-pink-800 to-purple-700 placeholder-white shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
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
  );
};

export default Library;
