import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/uno/Home";
import Game from "./pages/uno/Game";
import CreateGame from "./pages/uno/CreateGame";
import PrivateGame from "./pages/uno/Join/PrivateGame";
import PublicGame from "./pages/uno/Join/PublicGame";
import WaitRoom from "./pages/uno/WaitRoom";
import UnoHome from "./pages/uno/Home";
import Leaderboard from "./pages/leaderboard";
import ChessHome from "./pages/chess/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UnoHome />} />
      <Route path="/uno" element={<UnoHome />} />
      <Route exact path="/uno/Game/gameroom=:id" element={<Game />} />
      <Route path="/uno/Create" element={<CreateGame />} />
      <Route path="/uno/JoinPrivate" element={<PrivateGame />} />
      <Route path="/uno/JoinPublic" element={<PublicGame />} />
      <Route path="/uno/WaitingRoom/gameroom=:id" element={<WaitRoom />} />
      <Route path="/chess" element={<ChessHome />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
