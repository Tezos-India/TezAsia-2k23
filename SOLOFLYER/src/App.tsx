import { useState } from "react";
import StartGame from "./components/StartGame";
import GamePlay from "./components/GamePlay";

function App() {
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const toggleGamePlay = () => {
    setIsGameStarted((prev) => !prev);
  };

  const toggleGamePlayStart = () =>{
      setIsGameStarted((prev) => !prev);
  }

  return (
     <>{isGameStarted ? <GamePlay toggle={toggleGamePlay} /> : <StartGame toggle={toggleGamePlayStart}
     />}</>
    );
}

export default App;
