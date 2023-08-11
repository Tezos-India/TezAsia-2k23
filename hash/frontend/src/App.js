import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './conponents/Navbar';
import Home from './conponents/Home';
import About from './conponents/About';
import HowTo from './conponents/HowTo';
import Creators from './conponents/Creators';
import Contact from './conponents/Contact';
import Footer from './conponents/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <HowTo />
      <Creators />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
