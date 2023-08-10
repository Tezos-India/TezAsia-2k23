import React from 'react'
import './Navbar.css';

export default function Home() {
  return (
    <section id="home">
    <div className="home">
      <div className="container-box">
        <h1>Crypto <span>Play</span></h1>
        <p>Enhancing player engagement and trust in sports gaming with Tezos blockchain and virtual teams featuring
          real-life players.</p>
      </div>
      <div>
        <a href="#about" className="btn btn-primary">Explore</a>
      </div>
    </div>
  </section>
  )
}
