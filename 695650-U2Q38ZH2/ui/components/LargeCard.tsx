import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';

interface LargeCardProps {
    img: string;
    title: string;
    short_desc: string;
    long_desc: string;
    review_stars: string;
    max_users: string;
    link?: string;
    tags?: string[];
}

const LargeCard: React.FC<LargeCardProps> = ({
    img,
    title,
    short_desc,
    long_desc,
    review_stars,
    max_users,
    link,
    tags = []
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className='pointer-events-auto flex flex-col md:flex-row bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg shadow-lg p-6 md:p-12 hover:shadow-2xl transition duration-500 w-full mb-6'>
            <div className='relative w-full md:w-1/3 mb-6 md:mb-0 rounded-lg overflow-hidden hover:shadow-lg'>
                <Image src={img} alt={title} width={400} height={225} objectFit="cover" />
            </div>

            <div className="flex flex-col justify-between w-full md:w-2/3 md:ml-12">
                <div>
                    <h1 className='text-white text-4xl font-semibold mb-2 text-left'>{title}</h1>
                    <p className='text-gray-300 text-lg mb-2 text-left'>{short_desc}</p>
                    <div className="flex items-center mb-4">
                        <FontAwesomeIcon icon={faStar} color="#D1D5DB" size="lg" />
                        <span className="text-gray-300 text-xl mr-6 ml-2">{review_stars}/5</span>
                        <FontAwesomeIcon icon={faUsers} color="#D1D5DB" size="lg" />
                        <span className="text-gray-300 text-xl ml-2">{max_users} Users</span>
                    </div>
                    {tags.map((tag, index) => (
                        <span key={index} className="inline-block bg-pink-600 text-white px-3 py-1 m-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                    {isExpanded && (
                        <>
                            <p className='text-gray-400 text-lg mb-4 text-left'>{long_desc}</p>
                            {link && (
                                <Link href={link}>
                                    <button className="text-white text-3xl bg-gradient-to-br from-pink-600 to-purple-700 hover:from-pink-500 hover:to-purple-600 transition-all duration-300 ease-in-out transform hover:translate-y-1 px-10 py-3.5 font-semibold rounded-full shadow-2xl">
                                        Play Now
                                    </button>
                                </Link>
                            )}
                        </>
                    )}
                </div>

                <div className="mt-4">
                    <button onClick={() => setIsExpanded(!isExpanded)} className='text-white text-2xl bg-gradient-to-br from-pink-600 to-purple-700 hover:from-pink-500 hover:to-purple-600 transition-all duration-300 ease-in-out transform hover:translate-y-1 px-6 py-1.5 font-semibold rounded-full shadow-2xl'>
                        <FontAwesomeIcon icon={isExpanded ? faArrowUp : faArrowDown} size="1x" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LargeCard;
