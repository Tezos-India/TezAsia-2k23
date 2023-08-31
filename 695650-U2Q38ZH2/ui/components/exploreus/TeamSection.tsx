import Image from "next/image";
import React from "react";

const TeamMemberCard = ({ name, title, description, image }: any) => (
  <div className="bg-gray-700 rounded-lg shadow-lg p-6 transform transition duration-500 hover:shadow-2xl hover:-translate-y-3">
    <div className="flex flex-col items-center">
      <div className="relative w-44 h-44 mx-auto mb-4 shadow-lg rounded-full overflow-hidden">
        <Image
          className="object-cover"
          src={image}
          alt="profile picture"
          layout="fill"
        />
      </div>
      <h3 className="text-xl font-semibold text-center">{name}</h3>
      <p className="text-gray-800 text-lg text-center mb-2">{title}</p>
      <p className="text-md text-gray-900 text-center">{description}</p>
    </div>
  </div>
);

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Ishaan",
      title: "Solutions Developer",
      description:
        "I love writing code, designing scalable solutions and gaming in my free time.",
      image: "/profiles/ishaan.jpeg",
    },
    {
      name: "Yadnesh",
      title: "Web Developer",
      description:
        "Love coding, enthusiastic about the blockchain and Web3 space, learning more...",
      image: "/profiles/yadnesh.jpeg",
    },
    {
      name: "Paras",
      title: "Web Developer",
      description:
        "Developer with extensive experience in the MERN stack and a passion for blockchain technology. capable of building reliable online applications and researching cutting-edge blockchain solutions.",
      image: "/profiles/parass.jpeg",
    },
    {
      name: "Harsh",
      title: "Web Developer",
      description:
        "Proficient web developer, venturing into blockchain and embracing emerging tech for forward-looking digital solutions.",
      image: "/profiles/harsh.jpeg",
    },
  ];

  return (
    <section className="py-20 bg-gray-900 ">
      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className="container mx-auto"
      >
        <h2 className="text-5xl text-white font-semibold mb-16 text-center ">
          The Team Behind Blocks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
