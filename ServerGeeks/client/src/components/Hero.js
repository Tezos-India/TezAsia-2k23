// import Fade from 'react-reveal/Fade';
import { useEffect } from 'react';
import Avatar from "../assets/avatar.png";

const Hero = () => {

    const fetchData = async() => {
        const url = `https://api.ghost.tzstats.com/explorer/bigmap/359597/values`;
        // console.log(url)
        // fetchData(url)
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        })
        console.log(res.json());
    }

    fetchData()

    // useEffect(fetchData(), [])
  return (
    <div className="flex flex-col xl:flex-row xl:h-screen items-center pt-[5rem] w-full" >
        
        {/* <Fade bottom > */}
            <div className="flex flex-col w-auto  flex-1 h-full items-center xl:items-start justify-center text-white text-center xl:text-start space-y-8 mb-[4rem] " >
                <h1 className="text-[3rem] font-bold w-full xl:w-[25rem] " >
                Gamify: Where Web3 Meets Play</h1>

                <p className="text-s w-full xl:w-[19rem] text-gray-400 " >
                Welcome to Gamify, your gateway to the immersive world of Web3 gaming. 
                Explore a decentralized gaming universe, where blockchain technology unlocks new dimensions of play, ownership, and excitement. Join us and level up your gaming experience today!
                </p>

                <button className="text-m w-[10rem] w-auto py-2 px-3 rounded-full bg-gradient-to-tr from-[#D80027] to-[#FB9E3C]" >Unlock Web3 Adventures</button>
            </div>
        {/* </Fade> */}

        {/* <Fade bottom> */}
            <div className="flex items-center justify-center flex-1 h-full " >
                <img src={Avatar} alt="avatar" className='h-5/6'/>
            </div>
        {/* </Fade> */}
    </div>
  )
}

export default Hero