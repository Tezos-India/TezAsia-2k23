import React from 'react';
import { useState, useEffect } from 'react';
import StoryForm from '../pages/StoryForm';
import { connectWallet, getAccount } from '../utils/wallet';
import { Link } from 'react-router-dom';

function Navbar() {

  const [account, setAccount] = useState("");

  useEffect(() => {
    (async () => {
        const account = await getAccount();
        setAccount(account);        
    })();
  }, []);

  const onClickConnect = async () => {
    await connectWallet();
    const account = await getAccount();
    setAccount(account);
  }

  return (
    <div>
      <header>
        <nav className="bg-white border-gray-200 border-2 px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a className="flex items-center">
              <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap">StoryCraft</span>
            </a>
            <div className="flex items-center lg:order-2">
              <Link to={'/write'} className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">Write</Link>
              <button onClick={onClickConnect} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">{account ? account : "Connect Wallet"}</button>
              <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-2" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
            <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar;
