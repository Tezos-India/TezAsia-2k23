import { Link, useLocation } from 'react-router-dom'

import Logo from '../assets/logo.svg'
import WalletButton from './WalletButton'

export default function Navbar() {
  const location = useLocation()

  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown sm:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          {location.pathname !== '/' && (
            <ul
              tabIndex={0}
              className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <Link to="/home">
                  <span className="hover:text-gradient">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/bridge">
                  <span className="hover:text-gradient">Bridge</span>
                </Link>
              </li>
            </ul>
          )}
            
        </div>
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      {location.pathname !== '/' && (
        <div className="navbar-end">
          <div className="hidden sm:block">
            <Link to="/home" className="hover:text-gradient mx-6">
              Home
            </Link>
            <Link to="/bridge" className="hover:text-gradient ml-3 mr-6">
              Bridge
            </Link>
          </div>
          <WalletButton />
        </div>
      )}
    </div>
  )
}
