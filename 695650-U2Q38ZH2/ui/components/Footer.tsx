import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

export const Footer = () => {
  return (
    <div className="pointer-events-auto bg-black p-10 text-center">
      <div className="border-t border-white opacity-50 mb-10" />
      <div className="flex justify-center space-x-8 mb-6">
        <a href="/" className="text-2xl text-gray-400 hover:text-white transition duration-200">Home</a>
        <a href="/AboutUs" className="text-2xl text-gray-400 hover:text-white transition duration-200">About</a>
        <a href="/AboutUs#faq-section" className="text-2xl text-gray-400 hover:text-white transition duration-200">FAQ</a>
      </div>
      <div className="flex justify-center space-x-5 mb-6">
        <a href="#" className="text-gray-400 hover:text-white transition duration-200">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition duration-200">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition duration-200">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition duration-200">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
      </div>
      <div className="text-xs text-gray-400 mb-5">
        © 2023 BLOCKS Gaming, All rights reserved.
      </div>

      <div className="border-t border-white opacity-50" />
    </div>
  );
};
