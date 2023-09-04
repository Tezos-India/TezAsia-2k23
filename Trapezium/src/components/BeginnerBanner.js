import React, { useState } from 'react';
import './BeginnerBanner.css';

const BeginnerBanner = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen(false);
  
  const beginnerLinks = [
    {
      title: 'Introduction to Web 3',
      url: 'https://www.youtube.com/watch?v=0tZFQs7qBfQ',
    },
    {
      title: 'How to buy and sell NFTs on Tezos',
      url: 'https://www.youtube.com/watch?v=rylhU4Fe74Y',
    },
    {
      title: 'Tezos Basics',
      url: 'https://www.youtube.com/watch?v=Umy75ihttwo',
    },
  ];

  return (
    <>
      {isOpen && (
        <div className="beginner-banner">
          <h3>Are you new to Web 3?</h3>
          <p>We suggest watching the following videos to get started:</p>
          <ul>
            {beginnerLinks.map(link => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
          <button onClick={handleClose}>Close</button>
        </div>
      )}
    </>
  );
};

export default BeginnerBanner;
