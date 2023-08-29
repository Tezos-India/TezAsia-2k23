import { Link } from 'react-router-dom'

import heroLeft from '../assets/graphics/heroLeft.svg'
import heroRight from '../assets/graphics/heroRight.svg'
import sec5Head from '../assets/graphics/landingSec5.svg'
import sec5Line from '../assets/graphics/sec5Line.svg'
import Leaderboard from '../assets/images/leaderboard.png'
import Scroll from '../assets/scrollButton.svg'
import Beacon from '../assets/walletIcons/beacon.svg'
import Metamask from '../assets/walletIcons/metamask.svg'
import Temple from '../assets/walletIcons/temple.svg'
import walletConnect from '../assets/walletIcons/walletConnect.svg'
import PrimaryButton from '../components/PrimaryButton'
import SecondaryButton from '../components/SecondaryButton'

export default function Landing() {
  return (
    <div className="mb-60 mt-20">
      <div className="relative -mx-20">
        <img src={heroLeft} className="absolute left-0 top-60" />
        <img src={heroRight} className="absolute -top-36 right-0" />

        <div className="mb-32 flex flex-col items-center justify-center text-center ">
          <h1 className="mb-3">Ride the waves of decentralized gaming</h1>
          <h4 className="mb-10">
            The ultimate platform for hosting exhilarating tournaments on casual
            web games
          </h4>
          <p className="mb-10 max-w-2xl">
            {' '}
            Dive into a new era of online gaming with FunSurf. Whether you're a
            competitive spirit or a casual gamer, FunSurf brings you a
            decentralized gaming experience like no other. Harness the power of
            blockchain technology, low fees, and lightning-fast gameplay to
            elevate your gaming journey to the next level
          </p>
          <Link to="/home">
            <PrimaryButton text="Get Started" />
          </Link>
          <img
            src={Scroll}
            onClick={() => window.scrollTo(0, 750)}
            className="duration- mt-32 animate-bounce cursor-pointer"
          />
        </div>
      </div>

      <div className="-mx-20 mb-32 bg-landingSec2 bg-cover">
        <div className="flex flex-col py-32 md:flex-row">
          <div className="lg:mr-30 mb-4 mr-20">
            <img src={Leaderboard} width={700} />
          </div>
          <div className="mx-8 flex flex-col text-left">
            <h2 className="mb-5">Compete, conquer, and win!</h2>
            <p className="mb-3 max-w-lg">
              FunSurf's vibrant tournament ecosystem lets you showcase your
              skills and rise through the ranks. Climb to the top of the
              leaderboards and seize the opportunity to win exciting prizes in
              the form of crypto tokens.{' '}
            </p>
            <p className="max-w-lg">
              Whether you're a strategic mastermind or a lightning-fast player,
              FunSurf's tournaments offer a stage for everyone to shine.
            </p>
          </div>
        </div>
      </div>

      <div className="relative ">
        <img
          src={walletConnect}
          className="absolute left-20 top-10 animate-float"
        />
        <img src={Temple} className="absolute left-36 top-80 animate-float" />
        <img
          src={Metamask}
          className="absolute right-20 top-20 animate-float"
        />
        <img src={Beacon} className="absolute right-36 top-80 animate-float" />

        <div className="mb-32 flex flex-col items-center justify-center text-center">
          <h2 className="mb-1">Seamless Onboarding</h2>
          <h4 className="mb-8 font-extralight">
            Say goodbye to complicated setups!{' '}
          </h4>
          <p className="mb-5 max-w-xl text-center">
            Joining FunSurf is as easy as a few clicks. If you're already
            familiar with Metamask, it’s as easy as switching networks from
            Ethereum to other EVM chains.
          </p>
          <p className="max-w-2xl text-center">
            We've meticulously designed our platform to ensure that your
            onboarding experience is smooth and hassle-free, allowing you to
            focus on what you do best
          </p>
          <p className="mb-10 text-center font-semibold text-themePink">
            gaming!
          </p>
          <p className="mb-3 text-center">Join now to get 10 CTez for free</p>
          <Link to="/home">
            <PrimaryButton text="Claim free CTez" />
          </Link>
        </div>
      </div>

      <div className="-mx-20 mb-32 bg-landingSec4 bg-cover">
        <div className="mx-8 flex flex-col py-44 pl-10 text-left">
          <h2 className="mb-5 text-darkBlue">The Power of Etherlink Rollup</h2>
          <p className="mb-3 max-w-lg text-black">
            At FunSurf, we've reimagined the gaming landscape by combining the
            efficiency of Etherlink, an EVM-based rollup, with the robust
            security of the Tezos network. Enjoy near-instant transactions and
            minimal gas fees, all while benefiting from the unyielding security
            that Ethereum and Tezos are renowned for.{' '}
          </p>
          <p className="mb-5 max-w-lg text-black">
            This unique blend empowers FunSurf to accommodate millions of active
            users without compromising on security or user experience.
          </p>
          <a
            href="https://www.etherlink.com/"
            target="_blank"
            className="font-medium text-DarkPink"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="mb-32 flex flex-row ">
        <div className="mr-32">
          <img src={sec5Head} alt="Bridging the worlds with ease" />
        </div>
        <div className="flex flex-col justify-start gap-10">
          <div>
            <div className="mb-1 flex flex-row items-center gap-3">
              <img src={sec5Line} alt="graphic" />
              <h4 className="text-themeBlue">Frictionless bridge</h4>
            </div>
            <p className="max-w-md pl-9">
              FunSurf offers an in-app bridge that seamlessly connects Tezos and
              Etherlink.
            </p>
          </div>

          <div>
            <div className="mb-1 flex flex-row items-center gap-3">
              <img src={sec5Line} alt="graphic" />
              <h4 className="text-themeBlue">Instant transfers</h4>
            </div>
            <p className="max-w-md pl-9">
              Tezos users can effortlessly bridge their assets to Etherlink in a
              matter of seconds. With FunSurf's built-in bridge, you'll be
              competing and enjoying your favorite games in no time.
            </p>
          </div>

          <div>
            <div className="mb-1 flex flex-row items-center gap-3">
              <img src={sec5Line} alt="graphic" />
              <h4 className="text-themeBlue">Easy Withdrawals</h4>
            </div>
            <p className="max-w-md pl-9">
              Withdrawals are equally convenient, allowing you to transfer
              tokens back to Tezos instantly!
            </p>
          </div>
        </div>
      </div>

      <div className="mb-32 flex flex-col items-center justify-center text-center">
        <h2 className="mb-1">Join the FunSurf community</h2>
        <h4 className="mb-11 max-w-lg font-light leading-7">
          Join our ever-growing community of passionate gamers and blockchain
          enthusiasts.
        </h4>
        <p className="mb-5 max-w-2xl text-center">
          Connect with like-minded individuals, shminded individuals, share
          strategies, and stay updated on the latest tournaments and updates.
        </p>
        <p className="mb-14 max-w-2xl text-center">
          At FunSurf, we're more than just a platform – we're a vibrant
          community united by the love of gaming and the potential of blockchain
          technology.are strategies, and stay updated on the latest tournaments
          and updates.
        </p>
        <SecondaryButton text="Join our Discord" />
      </div>

      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="mb-1">Get ready to surf the fun</h2>
        <h4 className="mb-11 max-w-lg font-light leading-7">
          Are you ready to embark on a gaming adventure like never before?
        </h4>
        <p className="mb-5 max-w-2xl text-center">
          With FunSurf, you're not just playing games; you're shaping the future
          of decentralized gaming. Get started today and experience the thrill
          of competition, the ease of rollup technology, and the camaraderie of
          a passionate community. Join us in making gaming history – one
          tournament, one victory, and one wave of fun at a time.
        </p>
        <p className="mb-14 max-w-2xl text-center">
          Ready to ride the waves? Jump in now and let the fun begin!
        </p>
        <Link to="/home">
          <PrimaryButton text="Enter Now!" />
        </Link>
      </div>
    </div>
  )
}
