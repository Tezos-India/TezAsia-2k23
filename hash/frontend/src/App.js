import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navbar from './conponents/Navbar';
import Home from './conponents/Home';
import About from './conponents/About';
import HowTo from './conponents/HowTo';
import Creators from './conponents/Creators';
import Contact from './conponents/Contact';
import Footer from './conponents/Footer';
import Login from './conponents/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/how-to" component={HowTo} />
      <Route path="/creators" component={Creators} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Footer />
    </Router>
  );
}

export default App;
