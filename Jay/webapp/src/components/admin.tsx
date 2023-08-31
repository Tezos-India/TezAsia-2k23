import React, { useState, useEffect } from "react";
import { openAdmission, closeAdmission } from "../utils/operation";
import Navbar from "./Navbar";
import { fetchStorage } from "../utils/tzkt";

// Components

const Admin: React.FC = () => {
  // Players holding lottery tickets
  const [players, setPlayers] = useState<string[]>([]);
  const [students, setStudents] = useState<string[]>([]);
  const [tickets, setTickets] = useState<number>(3);
  const [openloading, setopenLoading] = useState<boolean>(false);
  const [closeloading, setcloseLoading] = useState<boolean>(false);
  const [isAdmissionOpen, setStatus] = useState<boolean>(false);
  const [displayed, setDisplayed] = useState(false);

  // Set players and tickets remaining
  useEffect(() => {
    // TODO 9 - Fetch players and tickets remaining from storage
    const fetchData = async () => {

        const storage = await fetchStorage();

        setStatus(storage.isAdmissionOpen)
        setStudents(storage.students)
        console.log(storage.students)
        // setPlayers([]);
        // setTickets(3);
    };

    fetchData();
  }, []);

  // TODO 7.a - Complete onBuyTicket function
  const openAdmissionbt = async () => {
    try
    {
        setopenLoading(true)
        await openAdmission()
        alert("Admission Opened Sucessfully")
        setStatus(true)
    }
    catch (error)
    {
        throw error
    }

    setopenLoading(false)
  };

  const handleDisplayClick = () => {
    setDisplayed(true);
  };

  const closeAdmissionbt = async () => {
    try
    {
        setcloseLoading(true)
        await closeAdmission()
        alert("Admission Closed Sucessfully")
        setStatus(false)
    }
    catch (error)
    {
        throw error
    }

    setcloseLoading(false)
  };
  // TODO 11.a - Complete onEndGame function
  const onEndGame = async () => {
  };

  return (
    <div className="h-100">
      <Navbar />
      <div className="admission-status">
        Admission Status:{' '}
        <span style={{ color: isAdmissionOpen ? 'green' : 'red'}}>
          {isAdmissionOpen ? 'Open' : 'Closed'}
        </span>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        {/* Ticket remaining display */}
        {/* <div className="py-1">Tickets remaining: {tickets}</div> */}
        {/* Action Buttons */}
        <div className="button-container">
          <button onClick={openAdmissionbt} className="btn btn-primary btn-lg">
            {/* TODO 7.b - Call onBuyTicket on click */}
            {/* TODO 7.c - Show "loading..." when buying operation is pending */}
            {openloading? "loading.." : "Open Admission"}
          </button>
          <button onClick={closeAdmissionbt} className="btn btn-primary btn-lg">
            {/* TODO 7.b - Call onBuyTicket on click */}
            {/* TODO 7.c - Show "loading..." when buying operation is pending */}
            {closeloading? "loading.." : "Close Admission"}
          </button>

          <button onClick={handleDisplayClick} className="btn btn-primary btn-lg"> Display </button>

        </div>  
          {displayed && (
        <div className="data-items">
          {students.map((dataItem, index) => (
            <div key={index} className="data-item">
                <p><strong>ID : {index}</strong><strong> Name : {dataItem}</strong></p>
            </div>
          ))}
        </div>
      )}

      </div>
    </div>
  );
};

export default Admin;
