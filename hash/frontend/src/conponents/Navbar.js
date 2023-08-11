import React from 'react';
// import { Link } from 'react-router-dom'; 
import './Navbar.css';
import logo from '../assets/images/2023/logo/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// import '@popperjs/core/dist/umd/popper.min.js';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <a className="navbar-brand" href="#">
        <img src={logo} alt="Logo" className="navbar-logo" style= {{height: + '160px'}}/>
        <span className="navbar-text">CryptoPlay</span>
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <a className="nav-link" href="#home">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#about">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#how-to">How To</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#creators">Creators</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#contact">Contact</a>
          </li>
        </ul>
        <a href="login.html" className="btn btn-primary">My Account</a>
      </div>
    </div>
  </nav>
  );
}
