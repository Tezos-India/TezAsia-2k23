import React from 'react'
import react from '../assets/images/2023/tech/react-logo.png'
import solidity from '../assets/images/2023/tech/solidity-logo.png'
import tezos from '../assets/images/2023/tech/tezos-logo.png'
import smartpy from '../assets/images/2023/tech/smartpy-logo.png'
import nodejs from '../assets/images/2023/tech/nodejs-logo.png'

export default function About() {
  return (
    <section id="about">
    <div className="about">
      <div className="heading">
        <h1>About <span>Crypto Play</span></h1>
      </div>
      <div className="tech">
        <a target="_blank" href="https://react.dev/">
            <img src={react} alt="react-img-logo"/>
        </a>
        <a target="_blank" href="https://soliditylang.org/">
          <img src={solidity} alt="solidity-img-logo"/>
        </a>
        <a target="_blank" href="https://tezos.com/">
          <img src={tezos} alt="tezos-img-logo"/>
        </a>
        <a target="_blank" href="https://smartpy.io/">
          <img src={smartpy} alt="smartpy-img-logo"/>
        </a>
        <a target="_blank" href="https://nodejs.org/en">
          <img src={nodejs} alt="nodejs-img-logo"/>
        </a>
        <div className="aboutTech">
          <h2>The CryptoPlay</h2>
          <p>A Fantasy game built on tezos blockchain Technology.</p>
          <div className="list-box">
            <ul>
              <li>Is a Decentrilized Platform</li>
              <li>Is More Secure</li>
              <li>Can Deposit & Widwarl rewards in Crypto</li>
              <li>Win amazing rewards like NTF's</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
