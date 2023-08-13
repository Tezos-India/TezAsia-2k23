import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const LargeCard = ({ img, title, desc, link }: any) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className='flex bg-gray-900 border rounded-lg p-8 m-12 hover:opacity-80 hover:shadow-lg transition duration-500'>
            <div className='m-2 mr-16'>
                <Image className='border rounded-full' src={img} alt="" width={400} height={400} />
            </div>
            <div>
                <h1 className='text-white text-6xl font-serif '>{title}</h1>
                <br />
                <p className='text-gray-400 text-xl font-mono mr-60'>{desc}</p>
                <div className='flex justify-center mt-12'>
                    <button onClick={() => setIsExpanded(!isExpanded)} className='border border-white rounded-lg p-4 cursor-pointer'>
                        <FontAwesomeIcon icon={faArrowDown} size="lg" />
                    </button>
                </div>
                {isExpanded && link && (
                    <div className='flex justify-center mt-4'>
                        <Link href={link}>
                            <button className='border border-white rounded-lg p-4 cursor-pointer'>
                                Play Now
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LargeCard;
