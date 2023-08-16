import Image from 'next/image';
import React from 'react';

const TeamMemberCard = ({ name, title, description, image }: any) => (
  <div className="bg-gray-700 rounded-lg shadow-lg p-6 transform transition duration-500 hover:shadow-2xl hover:-translate-y-3">
    <div className="flex flex-col items-center">
      <Image className=" rounded-full  mx-auto mb-4 shadow-lg" src={image} alt="profile picture"  width={180} height={180} />
      <h3 className="text-xl font-semibold text-center">{name}</h3>
      <p className="text-gray-800 text-lg text-center mb-2">{title}</p>
      <p className="text-md text-gray-900 text-center">{description}</p>
    </div>
  </div>
);

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Ishaan',
      title: 'Designer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: '/profile.png',
    },
    {
      name: 'Yadnesh',
      title: 'Designer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: '/profile.png',
    },
    {
      name: 'Paras',
      title: 'Designer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: '/profile.png', 
    },
    {
      name: 'Harsh',
      title: 'Designer',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: '/profile.png', 
    },
  ];

  return (
    <section className="py-20 bg-gray-900 ">
      <div  data-aos="fade-up"
     data-aos-duration="3000" className="container mx-auto">
        <h2 className="text-5xl text-white font-semibold mb-16 text-center ">The Team Behind Blocks</h2>
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
