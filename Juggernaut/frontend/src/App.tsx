import { Route, Routes } from 'react-router-dom'
import { WagmiConfig, createConfig } from 'wagmi'

import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Bridge from './pages/Bridge'
import Home from './pages/Home'
import Game from './pages/Game'
import Landing from './pages/Landing'
import Tournament from './pages/Tournament'
import { metamask, publicClient, webSocketPublicClient } from './utils/evm'
import { useGlobalState } from './utils/globalState'
import { useEffect } from 'react'

const config = createConfig({
  autoConnect: true,
  connectors: [metamask],
  publicClient,
  webSocketPublicClient,
})

function App() {
  const { refetchData } = useGlobalState()

  useEffect(() => {
    const fetchInterval = setInterval(() => {
      refetchData()
    }, 30000)
    return () => clearInterval(fetchInterval)
  }, [])

  return (
    <WagmiConfig config={config}>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bridge" element={<Bridge />} />
        <Route path="/tournament/:id" element={<Tournament />} />
        <Route path="/tournament/:tournamentId/game" element={<Game />} />
      </Routes>
      <Footer />
    </WagmiConfig>
  )
}

export default App
