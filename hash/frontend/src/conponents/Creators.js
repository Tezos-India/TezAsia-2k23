import React from 'react'
import ayushthakur from '../assets/images/2023/creators/ayushthakur.jpg'
import eshasuri from '../assets/images/2023/creators/eshasuri.jpg'
import garimasaigal from '../assets/images/2023/creators/garimasaigal.jpg'
import manavjamwal from '../assets/images/2023/creators/manavjamwal.jpg'

export default function Creators() {
  return (
    <section id="creators">
    <div className="heading">
      <h1>Meet The <span>Creators</span></h1>
    </div>
    <div className="creators-profile">
      <figure>
        <a target="_blank" href="https://github.com/ayushhhthakur">
          <img src={ayushthakur} alt="Ayush Thakur"/>
        </a>
        <figcaption><a target="_blank" href="https://github.com/ayushhhthakur">Ayush Thakur</a></figcaption>
      </figure>
      <figure><a target="_blank" href="">
          <img src={eshasuri} alt="Esha Suri"/>
        </a>
        <figcaption><a target="_blank" href="">Esha Suri</a></figcaption>
      </figure>
      <figure>
        <a target="_blank" href="">
          <img src={garimasaigal} alt="Garima Saigal"/>
        </a>
        <figcaption><a target="_blank" href="">Garima Saigal</a></figcaption>
      </figure>
      <figure>
        <a target="_blank" href="https://github.com/jamwal69">
          <img src={manavjamwal} alt="Manav Jamwal"/>
        </a>
        <figcaption><a target="_blank" href="https://github.com/jamwal69">Manav Jamwal</a></figcaption>
      </figure>
    </div>
  </section>
  )
}
