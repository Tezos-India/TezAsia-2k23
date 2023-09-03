import React, { useState, useEffect } from "react";
// import { getNFT } from "./utils/api";
// Components
import LayoutComponent from "./components/Layout";


const App: React.FC = () => {
  // Players holding lottery tickets
  const [players, setPlayers] = useState<string[]>([]);
  const [tickets, setTickets] = useState<number>(3);
  

  useEffect(() => {

    const fetchData = async () => {
      setPlayers([]);
      setTickets(3);
    };

    fetchData();
  }, []);

  // TODO 7.a - Complete onBuyTicket function
  const onBuyTicket = async () => {
  };

  // TODO 11.a - Complete onEndGame function
  const onEndGame = async () => {
  };

  return (
    <div className='App'>
    <LayoutComponent />
  </div>
  );
};

export default App;
