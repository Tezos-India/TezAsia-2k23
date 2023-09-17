import React, { Fragment, useCallback, useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import confetti from 'canvas-confetti'
import Splitting from 'splitting'
import gsap from 'gsap'
import T from 'prop-types'
import { participatedWeeklyOperation } from "../../utils/operation";
import { useNavigate } from "react-router-dom";
import countdownBeep from "../../assets/audio/countdown-beep.mp3";
import pop from "../../assets/audio/pop.mp3";
import squeakIn from "../../assets/audio/squeak-in.mp3";
import squeakOut from "../../assets/audio/squeak-out.mp3";
import kidsCheering from "../../assets/audio/kids-cheering.mp3";
import thudSmall from "../../assets/audio/thud--small.mp3";
import whistle from "../../assets/audio/whistle.mp3";
import sparkle from "../../assets/audio/sparkle.mp3";
import click from "../../assets/audio/click.mp3";

import malletSrc from '../../assets/mallet.svg'

// Constants
const constants = {
  TIME_LIMIT: 30000,
  MOLE_SCORE: 100,
  POINTS_MULTIPLIER: 0.9,
  TIME_MULTIPLIER: 1.2,
  MOLES: 5,
  REGULAR_SCORE: 100,
  GOLDEN_SCORE: 1000,
}

// Custom Hooks
const useAudio = (src, volume = 1) => {
  const [audio, setAudio] = useState(null)
  useEffect(() => {
    const AUDIO = new Audio(src)
    AUDIO.volume = volume
    setAudio(AUDIO)
  }, [src])
  return {
    play: () => audio.play(),
    pause: () => audio.pause(),
    stop: () => {
      audio.pause()
      audio.currentTime = 0
    },
  }
}

const usePersistentState = (key, initialValue) => {
  const [state, setState] = useState(
    window.localStorage.getItem(key)
      ? JSON.parse(window.localStorage.getItem(key))
      : initialValue
  )
  useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])
  return [state, setState]
}

// Utils
const generateMoles = () =>
  new Array(constants.MOLES).fill().map(() => ({
    speed: gsap.utils.random(0.5, 2),
    delay: gsap.utils.random(0.5, 5),
    points: constants.MOLE_SCORE,
  }))


// Components

const CountDown = ({ fx, onComplete }) => {
  const count = useRef(null)
  const three = useRef(null)
  const two = useRef(null)
  const one = useRef(null)

  useEffect(() => {
    gsap.set([three.current, two.current, one.current], { display: 'none' })
    count.current = gsap
      .timeline({
        delay: 0.5,
        onComplete,
      })
      .set(three.current, { display: 'block' })
      .fromTo(
        three.current,
        {
          scale: 1,
          rotate: gsap.utils.random(-30, 30),
        },
        {
          scale: 0,
          rotate: gsap.utils.random(-30, 30),
          duration: 1,
          onStart: () => fx(),
        }
      )
      .set(two.current, { display: 'block' })
      .fromTo(
        two.current,
        {
          scale: 1,
          rotate: gsap.utils.random(-30, 30),
        },
        {
          scale: 0,
          rotate: gsap.utils.random(-30, 30),
          duration: 1,
          onStart: () => fx(),
        }
      )
      .set(one.current, { display: 'block' })
      .fromTo(
        one.current,
        {
          scale: 1,
          rotate: gsap.utils.random(-30, 30),
        },
        {
          scale: 0,
          rotate: gsap.utils.random(-30, 30),
          duration: 1,
          onStart: () => fx(),
        }
      )

    return () => {
      if (count.current) count.current.kill()
    }
  }, [])
  return (
    <Fragment>
      <h2 ref={three} className="countdown-number" style={{ display: 'none' }}>
        3
      </h2>
      <h2 ref={two} className="countdown-number" style={{ display: 'none' }}>
        2
      </h2>
      <h2 ref={one} className="countdown-number" style={{ display: 'none' }}>
        1
      </h2>
    </Fragment>
  )
}
CountDown.propTypes = {
  fx: T.func.isRequired,
  onComplete: T.func.isRequired,
}

const FinishScreen = ({ onRestart, onReset, result, navigate }) => (
  <div className="info-screen">
    <div className="results">
      <h2 className="info__text boring-text">{`You Scored ${result}`}</h2>
    </div>
    {/* <button className='whacButton' onClick={onRestart}>Play Again</button> */}
    <button className='whacButton' onClick={() => navigate('/', { replace: true })}>Main Menu</button>
  </div>
)

FinishScreen.propTypes = {
  onRestart: T.func.isRequired,
  onReset: T.func.isRequired,
  result: T.number.isRequired,
  navigate: T.func.isRequired,
}

const StartScreen = ({ onStart }) => (
  <div className="info-screen">
    <h1 className="title">
      <span>Whac</span>
      <span>a</span>
      <span>Mole</span>
    </h1>
    <button className='whacButton' onClick={onStart}>Start Game</button>
  </div>
)

StartScreen.propTypes = {
  onStart: T.func.isRequired,
}

const Timer = ({ time, interval = 1000, onEnd }) => {
  const [internalTime, setInternalTime] = useState(time)
  const timerRef = useRef(time)
  const timeRef = useRef(time)
  useEffect(() => {
    if (internalTime === 0 && onEnd) {
      onEnd()
    }
  }, [internalTime, onEnd])
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setInternalTime((timeRef.current -= interval))
    }, interval)
    return () => {
      clearInterval(timerRef.current)
    }
  }, [interval])
  return (
    <Fragment>
      <svg className="icon" viewBox="0 0 512 512" width="100" title="clock">
        <path d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z" />
      </svg>
      <span className="info__text">{`${internalTime / 1000}s`}</span>
    </Fragment>
  )
}

Timer.defaultProps = {
  interval: 1000,
}

Timer.propTypes = {
  time: T.number.isRequired,
  interval: T.number,
  onEnd: T.func.isRequired,
}

// This is the centerpiece of the game.
// It's the most complex component. But don't be scared of it!
const Mole = ({
  active = false,
  loading = false,
  onWhack,
  speed,
  delay,
  points,
  pointsMin = 10,
}) => {
  const [whacked, setWhacked] = useState(false)
  const delayedRef = useRef(null)
  const pointsRef = useRef(points)
  const buttonRef = useRef(null)
  const capBody = useRef(null)
  const moleRef = useRef(null)
  const capPeak = useRef(null)
  const loadingRef = useRef(null)
  const noseRef = useRef(null)
  const moleContainerRef = useRef(null)
  const faceRef = useRef(null)
  const capRef = useRef(null)
  const specsRef = useRef(null)
  const bobRef = useRef(null)
  const eyesRef = useRef(null)
  const tummyRef = useRef(null)

  // Use a callback to cache the function and share it between effects.
  const setMole = useCallback(
    (
      override,
      accent = 45,
      shades = 1,
      golden = 1,
      hue = 45,
      lightness = 65
    ) => {
      // Give a 1% chance of getting the "Golden" Mole.
      if (Math.random() > 0.99 || override) {
        // Create the "Golden" Mole
        pointsRef.current = constants.GOLDEN_SCORE
        // Set the specs and cap as displayed
        gsap.set([capRef.current, specsRef.current], {
          display: 'block',
        })
        // Set specific colors and that the shades/golden are active
        gsap.set(moleContainerRef.current, {
          '--accent': accent,
          '--shades': shades,
          '--golden': golden,
          '--hue': hue,
          '--lightness': lightness,
        })
      } else {
        // Create a "Regular" Mole
        pointsRef.current = constants.REGULAR_SCORE
        // Set whether Mole has a cap or specs
        gsap.set([capRef.current, specsRef.current], {
          display: () => (Math.random() > 0.5 ? 'block' : 'none'),
        })
        // Set random colors for Mole.
        gsap.set(moleContainerRef.current, {
          '--accent': gsap.utils.random(0, 359),
          '--shades': Math.random() > 0.65 ? 1 : 0,
          '--golden': 0,
          '--hue':
            Math.random() > 0.5
              ? gsap.utils.random(185, 215)
              : gsap.utils.random(30, 50),
          '--lightness': gsap.utils.random(45, 75),
        })
      }
    },
    []
  )

  // Use an effect to get the Mole moving
  useEffect(() => {
    // Set the Mole position and overlay button to underground
    gsap.set([moleRef.current, buttonRef.current], {
      yPercent: 100,
    })
    // Show Mole
    gsap.set(moleRef.current, { display: 'block' })
    // Create the bobbing timeline and store a ref so we can kill it on unmount.
    // Timeline behavior defined by props
    if (active) {
      // Set characteristics for the Mole.
      setMole()
      bobRef.current = gsap.to([buttonRef.current, moleRef.current], {
        yPercent: 0,
        duration: speed,
        yoyo: true,
        repeat: -1,
        delay,
        repeatDelay: delay,
        onRepeat: () => {
          pointsRef.current = Math.floor(
            Math.max(pointsRef.current * constants.POINTS_MULTIPLIER, pointsMin)
          )
        },
      })
    }
    // Cleanup the timeline on unmount
    return () => {
      if (bobRef.current) bobRef.current.kill()
    }
  }, [active, delay, pointsMin, speed, setMole])

  // When a Mole is whacked, animate it underground
  // Swap out the Mole style, reset it, and speed up the bobbing timeline.
  useEffect(() => {
    if (whacked) {
      // Render something in the body
      bobRef.current.pause()
      gsap.to([moleRef.current, buttonRef.current], {
        yPercent: 100,
        duration: 0.1,
        onComplete: () => {
          delayedRef.current = gsap.delayedCall(gsap.utils.random(1, 3), () => {
            setMole()
            setWhacked(false)
            bobRef.current
              .restart()
              .timeScale(bobRef.current.timeScale() * constants.TIME_MULTIPLIER)
          })
        },
      })
    }
    // If the delayed restart isn't started and we unmount, it will need cleaning up.
    return () => {
      if (delayedRef.current) delayedRef.current.kill()
    }
  }, [whacked, setMole])

  // If a Mole is set to loading, play the loading animation version
  useEffect(() => {
    if (loading) {
      setMole(true, 10, 1, 0, 200, 70)
      loadingRef.current = gsap
        .timeline({
          repeat: -1,
          repeatDelay: 1,
        })
        // Shooting up!
        .to(moleRef.current, {
          yPercent: 5,
          ease: 'back.out(1)',
        })
        .to(
          capRef.current,
          {
            yPercent: -15,
            duration: 0.1,
            repeat: 1,
            yoyo: true,
          },
          '>-0.2'
        )
        // Side to side
        .to([capBody.current, faceRef.current], {
          xPercent: 10,
        })
        .to(
          capPeak.current,
          {
            xPercent: -10,
          },
          '<'
        )
        .to(
          [eyesRef.current, specsRef.current, tummyRef.current],
          {
            xPercent: 8,
          },
          '<'
        )
        .to(
          noseRef.current,
          {
            xPercent: 25,
          },
          '<'
        )
        .to([faceRef.current, capBody.current], {
          xPercent: -10,
          duration: 0.75,
        })
        .to(
          capPeak.current,
          {
            xPercent: 28,
            duration: 0.5,
          },
          '<'
        )
        .to(
          [eyesRef.current, specsRef.current, tummyRef.current],
          {
            xPercent: -8,
            duration: 0.75,
          },
          '<'
        )
        .to(
          noseRef.current,
          {
            xPercent: -25,
            duration: 0.75,
          },
          '<'
        )
        .to(moleRef.current, {
          yPercent: 100,
          delay: 0.2,
          ease: 'power4.in',
        })
        .to(
          capRef.current,
          {
            yPercent: -15,
            duration: 0.2,
            ease: 'power4.in',
          },
          '<+0.05'
        )
    }
    return () => {
      gsap.set(
        [
          capRef.current,
          capPeak.current,
          capBody.current,
          faceRef.current,
          noseRef.current,
          eyesRef.current,
          specsRef.current,
          tummyRef.current,
        ],
        {
          xPercent: 0,
          yPercent: 0,
        }
      )
      if (loadingRef.current) loadingRef.current.kill()
    }
  }, [loading])

  // To render the score, we don't need React elements.
  // We can render them straight to the DOM and remove them once they've animated.
  // Alternatively, we could use a React DOM Portal. However, our element has
  // a short lifespan and doesn't update, etc.
  const renderScore = (x, y) => {
    const SCORE_HOLDER = document.createElement('div')
    SCORE_HOLDER.className = 'mole__points-holder'
    const SCORE = document.createElement('div')
    SCORE.className = 'mole__points'
    SCORE.innerText = pointsRef.current
    SCORE_HOLDER.appendChild(SCORE)
    document.body.appendChild(SCORE_HOLDER)
    gsap.set(SCORE_HOLDER, {
      '--angle': gsap.utils.random(-35, 35),
      '--accent': gsap.utils.random(0, 359),
    })
    gsap
      .timeline({
        onComplete: () => SCORE_HOLDER.remove(),
      })
      .set(SCORE_HOLDER, {
        left: x,
        top: y,
      })
      .to(SCORE, {
        yPercent: -100,
        duration: 0.35,
      })
      .to(
        SCORE,
        {
          opacity: 0,
          duration: 0.1,
        },
        '>-0.1'
      )
  }

  // On Whack, set "whacked" to true.
  // At the same time, render a score in the appropriate spot
  // And fire the callback so the Game can track the score.
  // If the pointsRef is higher than half the golden score
  // We know it's golden Mole so we can play a different sound.
  const whack = (e) => {
    setWhacked(true)
    renderScore(e.pageX, e.pageY)
    onWhack(pointsRef.current, pointsRef.current > constants.GOLDEN_SCORE * 0.5)
  }

  // Much of what is rendered is the Mole SVG and the Hole.
  // You could do this with images and CSS based on your design.
  return (
    <div className="mole__hole" ref={moleContainerRef}>
      <svg
        className="mole"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXhtml="http://www.w3.org/1999/xhtml">
        <defs>
          <radialGradient
            id="mole-shadow"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(101 137) rotate(90) scale(115 90.9302)">
            <stop stopColor="transparent" stopOpacity="0" />
            <stop offset="1" stopColor="hsla(var(--hue, 0), 10%, 10%, 0.35)" />
          </radialGradient>
        </defs>
        <g className="mole__ground">
          <clipPath id="hole-mask" x={0} y={150} width={200} height={50}>
            <ellipse cx={100} cy={175} rx={100} ry={25} />
          </clipPath>
          <g clipPath="url(#hole-mask)">
            <ellipse cx={100} cy={175} rx={100} ry={25} className="hole__lip" />
            <ellipse cx={100} cy={190} rx={100} ry={25} className="hole" />
          </g>
        </g>
        <clipPath id="mole-clip">
          <path
            transform="translate(0 0.5)"
            d="M200 0H0V175.58C0 188.764 44.7715 200 100 200C155.228 200 200 188.751 200 175.58V0Z"
          />
        </clipPath>
        <g clipPath="url(#mole-clip)">
          <g className="mole__mole" ref={moleRef}>
            <path
              d="M68.2872 22.3162C78.222 18.2447 89.0989 16 100.5 16C147.444 16 185.5 54.0558 185.5 101V266H15.5V101C15.5 77.2309 25.2562 55.7405 40.9826 40.3149C39.7451 39.0121 39 37.3328 39 35.5C39 31.3579 42.8056 28 47.5 28C48.4021 28 49.2714 28.124 50.0872 28.3537C51.3734 22.0787 56.7717 17.8064 62.349 18.748C64.7464 19.1528 66.7962 20.4567 68.2872 22.3162Z"
              className="mole__body"
            />
            <path
              d="M68.2872 22.3162C78.222 18.2447 89.0989 16 100.5 16C147.444 16 185.5 54.0558 185.5 101V266H15.5V101C15.5 77.2309 25.2562 55.7405 40.9826 40.3149C39.7451 39.0121 39 37.3328 39 35.5C39 31.3579 42.8056 28 47.5 28C48.4021 28 49.2714 28.124 50.0872 28.3537C51.3734 22.0787 56.7717 17.8064 62.349 18.748C64.7464 19.1528 66.7962 20.4567 68.2872 22.3162Z"
              fill="url(#mole-shadow)"
              className="mole__gradient"
            />
            <rect
              ref={tummyRef}
              x="45.5"
              y="155"
              width="110"
              height="123"
              rx="55"
              className="mole__white"
            />
            <g className="mole__eyes" ref={eyesRef}>
              <circle className="mole__feature" cx="53" cy="84" r="6" />
              <circle className="mole__feature" cx="148" cy="84" r="6" />
            </g>
            <g className="mole__eyes--crossed">
              <path
                d="M47.343 78.343a1 1 0 0 1 1.414 0l9.9 9.9a1 1 0 0 1-1.414 1.414l-9.9-9.9a1 1 0 0 1 0-1.414z"
                className="mole__feature"
                strokeWidth="2"
              />
              <path
                d="M58.657 78.343a1 1 0 0 1 0 1.414l-9.9 9.9a1 1 0 0 1-1.414-1.414l9.9-9.9a1 1 0 0 1 1.414 0zm95 0a1 1 0 0 1 0 1.414l-9.9 9.9a1 1 0 1 1-1.414-1.414l9.9-9.9a1 1 0 0 1 1.414 0z"
                className="mole__feature"
                strokeWidth="2"
              />
              <path
                d="M153.657 89.657a1 1 0 0 1-1.414 0l-9.9-9.9a1 1 0 0 1 1.414-1.414l9.9 9.9a1 1 0 0 1 0 1.414z"
                className="mole__feature"
                strokeWidth="2"
              />
            </g>
            <clipPath id="muzzle-clip" x="60" y="82" width="81" height="50">
              <ellipse cx="100.5" cy="107" rx="40" ry="25" />
            </clipPath>
            <g ref={faceRef}>
              <g clipPath="url(#muzzle-clip)">
                <ellipse
                  className="mole__shadow"
                  cx="100.5"
                  cy="107"
                  rx="40"
                  ry="25"
                />
                <ellipse
                  className="mole__white"
                  cx="100.5"
                  cy="103"
                  rx="40"
                  ry="25"
                />
              </g>
              <path
                className="mole__whiskers"
                strokeWidth="2"
                strokeLinecap="round"
                d="m32.051 101.054 36.003 1.895m65.577 8.202 33.02 4.718m-97.98-7.724-35.526 5.684m133.884-11.801-33.501.943"
              />
              <ellipse
                ref={noseRef}
                className="mole__nose"
                cx="100.5"
                cy="91"
                rx="10"
                ry="6"
              />
            </g>
            <g className="specs" ref={specsRef}>
              <circle
                cx="53"
                cy="84"
                r="12"
                className="specs__lens"
                strokeWidth="4"
              />
              <circle
                className="specs__lens"
                cx="148"
                cy="84"
                r="12"
                strokeWidth="4"
              />
              <path
                className="specs__bridge"
                d="M65 84s14-6 36.5-6 34.5 6 34.5 6"
                stroke="#000"
                strokeWidth="4"
              />
              <clipPath id="lens-clip" x="43" y="74" width="20" height="20">
                <circle cx="53" cy="84" r="10" />
              </clipPath>
              <g clipPath="url(#lens-clip)" className="specs__glare">
                <path d="m57.006 56 4.23 2.1-24.006 48.37-4.23-2.1zm5 3 2.154 1.07-24.006 48.37L38 107.37z" />
              </g>
            </g>
            <g className="mole__cap" ref={capRef}>
              <path
                ref={capPeak}
                d="M57 61.273C57 63.683 42.578 64 30.882 64 19.187 64 9 63.455 9 62.364 9 59.954 26.246 58 37.941 58 49.637 58 57 58.863 57 61.273z"
                className="cap__accent"
              />
              <path className="cap__accent" d="M32 56h136v8H32z" />
              <clipPath
                id="cap-clip"
                maskUnits="userSpaceOnUse"
                x="22"
                y="8"
                width="157"
                height="57">
                <path d="M99.5 8C71 8 29 25.5 22 64.5h157C173.5 21.5 128 8 99.5 8z" />
              </clipPath>
              <g clipPath="url(#cap-clip)">
                <path
                  ref={capBody}
                  d="M-10 8h220v57h-89.5V51.5H82V65h-92V8z"
                  className="cap__body"
                />
              </g>
              <ellipse
                cx="100.5"
                cy="8.5"
                rx="6"
                ry="2.5"
                className="cap__accent"
              />
            </g>
          </g>
        </g>
        <g clipPath="url(#mole-clip)">
          <foreignObject x={0} y={0} width={200} height={200}>
            <button className='whacButton mole__whack' ref={buttonRef} onClick={whack}>
              Whack!
            </button>
          </foreignObject>
        </g>
      </svg>
    </div>
  )
}

Mole.defaultProps = {
  pointsMin: 10,
}

Mole.propTypes = {
  active: T.bool.isRequired,
  loading: T.bool.isRequired,
  onWhack: T.func.isRequired,
  speed: T.number.isRequired,
  delay: T.number.isRequired,
  points: T.number.isRequired,
  pointsMin: T.number,
}

const Score = ({ value }) => (
  <Fragment>
    <svg className="icon" viewBox="0 0 576 512" width="100" title="hammer">
      <path d="M571.31 193.94l-22.63-22.63c-6.25-6.25-16.38-6.25-22.63 0l-11.31 11.31-28.9-28.9c5.63-21.31.36-44.9-16.35-61.61l-45.25-45.25c-62.48-62.48-163.79-62.48-226.28 0l90.51 45.25v18.75c0 16.97 6.74 33.25 18.75 45.25l49.14 49.14c16.71 16.71 40.3 21.98 61.61 16.35l28.9 28.9-11.31 11.31c-6.25 6.25-6.25 16.38 0 22.63l22.63 22.63c6.25 6.25 16.38 6.25 22.63 0l90.51-90.51c6.23-6.24 6.23-16.37-.02-22.62zm-286.72-15.2c-3.7-3.7-6.84-7.79-9.85-11.95L19.64 404.96c-25.57 23.88-26.26 64.19-1.53 88.93s65.05 24.05 88.93-1.53l238.13-255.07c-3.96-2.91-7.9-5.87-11.44-9.41l-49.14-49.14z" />
    </svg>
    <span className="info__text">{value}</span>
  </Fragment>
)

Score.propTypes = {
  value: T.number.isRequired,
}

// Mallet that tracks users' cursor whilst game is playing.
const Mallet = () => {
  const cursorRef = useRef(null)
  const malletRef = useRef(null)
  const whackRef = useRef(null)
  useEffect(() => {
    gsap.set(malletRef.current, {
      xPercent: -23,
      yPercent: 10,
      rotate: 45,
    })
    // Create a timeline that can be restarted on pointerdown
    whackRef.current = gsap.timeline().fromTo(
      malletRef.current,
      {
        rotate: 45,
      },
      {
        rotate: 0,
        duration: 0.05,
        repeat: 1,
        yoyo: true,
      }
    )
    // Update function for CSS variable positioning
    const UPDATE = ({ x, y }) => {
      if (cursorRef.current)
        gsap.set(cursorRef.current, {
          '--x': x,
          '--y': y,
        })
    }
    UPDATE({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    // On whack, restart the GSAP timeline
    const WHACK = () => {
      whackRef.current.restart()
    }
    window.addEventListener('pointermove', UPDATE)
    window.addEventListener('pointerdown', WHACK)
    gsap.set(cursorRef.current, { display: 'block' })
    // Make sure we clean up after
    return () => {
      whackRef.current.kill()
      window.removeEventListener('pointerdown', WHACK)
      window.removeEventListener('pointermove', UPDATE)
    }
  }, [])
  return (
    <div ref={cursorRef} className="mallet">
      <img src={malletSrc} ref={malletRef} alt="Mallet" />
    </div>
  )
}

const WhacAMoleGame = () => {
  const { play: playCount } = useAudio(
    countdownBeep
  )
  const { play: playWhack } = useAudio(
    pop
  )
  const { play: playSqueak } = useAudio(
    squeakIn
  )
  const { play: playSqueakOut } = useAudio(
    squeakOut
  )
  const { play: playCheer } = useAudio(
    kidsCheering
  )
  const { play: playThud } = useAudio(
    thudSmall,
    0.65
  )
  const { play: playWhistle } = useAudio(
    whistle,
    0.65
  )
  const { play: playSparkle } = useAudio(
    sparkle
  )
  const { play: playClick } = useAudio(
    click
  )
  const [moles, setMoles] = useState(generateMoles())
  const [playing, setPlaying] = useState(false)
  const [starting, setStarting] = useState(false)
  const [finished, setFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [newHighScore, setNewHighScore] = useState(false)
  const [muted, setMuted] = usePersistentState('whac-muted', true)
  const [highScore, setHighScore] = usePersistentState('whac-high-score', 0)
  const boardRef = useRef(null)

  const onWhack = (points, golden) => {
    gsap.to(boardRef.current, {
      yPercent: 2,
      repeat: 1,
      yoyo: true,
      duration: 0.05,
    })
    if (!muted) {
      playThud()
      if (golden) playSparkle()
      else {
        // Play random noise from selection
        ;[playWhack, playSqueak, playSqueakOut][Math.floor(Math.random() * 3)]()
      }
    }
    setScore(score + points)
  }

  const endGame = async () => {
    if (!muted) {
      playClick()
      playWhistle()
    }
    if (score > parseInt(highScore, 10)) {
      if (!muted) {
        playCheer()
      }
      confetti()
      setHighScore(score)
      setNewHighScore(true)
    }
    
    setPlaying(false)
    setFinished(true)
    await participatedWeeklyOperation(0, score)
  }

  const startPlaying = () => {
    if (!muted) playClick()
    setStarting(false)
    setPlaying(true)
    if (!muted) playWhistle()
  }

  const resetGame = () => {
    if (!muted) playClick()
    setScore(0)
    setNewHighScore(false)
    setMoles(generateMoles())
    setStarting(false)
    setPlaying(false)
    setFinished(false)
  }

  const startGame = () => {
    if (!muted) playClick()
    setScore(0)
    setNewHighScore(false)
    setMoles(generateMoles())
    setStarting(true)
    setFinished(false)
  }

  const toggleMute = () => {
    if (muted) playClick()
    setMuted(!muted)
  }
  const navigate = useNavigate();

  return (
    <Fragment className="whacMoleBody">
      <button
        className="mute-button icon-button whacButton"
        onClick={toggleMute}>
        {muted && (
          <Fragment>
            <span className="sr-only">Mute Audio</span>
            <svg
              className="icon"
              viewBox="0 0 512 512"
              width="100"
              title="Mute audio">
              <path d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z" />
            </svg>
          </Fragment>
        )}
        {!muted && (
          <Fragment>
            <span className="sr-only">Audio On</span>
            <svg
              className="icon"
              viewBox="0 0 576 512"
              width="100"
              title="Audio On">
              <path d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z" />
            </svg>
          </Fragment>
        )}
      </button>
      {!starting && !playing && !finished && (
        <StartScreen onStart={startGame} />
      )}
      {/* Starting */}
      {starting && (
        <CountDown
          onComplete={startPlaying}
          fx={() => {
            if (!muted) playCount()
          }}
        />
      )}
      {/* Playing */}
      {playing && (
        <Fragment>
          <button className="icon-button end-button whacButton" onClick={endGame}>
            <span className="sr-only">End Game</span>
            <svg
              className="icon"
              viewBox="0 0 352 512"
              width="100"
              title="times">
              <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
            </svg>
          </button>
          <Mallet />
          <div className="game-info">
            <Score value={score} />
            <Timer time={constants.TIME_LIMIT} onEnd={endGame} />
          </div>
        </Fragment>
      )}
      {/* Moles are always visible but not always active */}
      <main className="whacMain" ref={boardRef}>
        <div className="moles">
          {moles.map(({ speed, delay, points }, id) => (
            <Mole
              key={id}
              onWhack={onWhack}
              speed={speed}
              active={playing}
              delay={delay}
              points={points}
              loading={id === 2 && !starting && !playing && !finished}
            />
          ))}
        </div>
      </main>
      {/* Finished */}
      
      {finished && (
        <FinishScreen
          onRestart={startGame}
          onReset={resetGame}
          result={score}
          navigate={navigate}
        />
      )}
    </Fragment>
  )
}

export default WhacAMoleGame;

// ReactDOM.render(<React.StrictMode><Game/></React.StrictMode>, document.getElementById('root'))