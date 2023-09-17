import React from "react";
import "./App.css?version=1";
import "./dist/output.css?version=1";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/uno/Game";
import WhacAMoleGame from "./pages/whac-a-mole/WhacAMoleGame"
import CreateGame from "./pages/uno/CreateGame";
import PrivateGame from "./pages/uno/Join/PrivateGame";
import PublicGame from "./pages/uno/Join/PublicGame";
import WaitRoom from "./pages/uno/WaitRoom";
import UnoHome from "./pages/uno/Home";
import Leaderboard from "./pages/leaderboard";
import WeeklyForm from "./pages/WeeklyForm";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/uno" element={<UnoHome />} />
      <Route exact path="/uno/Game/gameroom=:id" element={<Game />} />
      <Route path="/uno/Create" element={<CreateGame />} />
      <Route path="/uno/JoinPrivate" element={<PrivateGame />} />
      <Route path="/uno/JoinPublic" element={<PublicGame />} />
      <Route path="/uno/WaitingRoom/gameroom=:id" element={<WaitRoom />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/whac-a-mole" element={<WhacAMoleGame />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/weeklyForm" element={<WeeklyForm />} />
    </Routes>
  );
}

export default App;
