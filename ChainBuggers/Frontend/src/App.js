import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import TheatreSelectionPage from "./pages/TheatreSelectionPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import SignUpPage from "./pages/SignUpPage";
import UserPage from "./pages/UserPage";
import PaymentPage from "./pages/PaymentPage";

function App() {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);
  const [userData, setUserData] = useState({});

  // const [checkLog, setCheckLog] = useState("")
  // console.log("log", userData)

  var now = new Date().getTime();
  var localData = localStorage.getItem("jwt_token");
  if (localData) {
    var time = JSON.parse(localData);
    var diff;
    setInterval(() => {
      diff = now - time.time;
      if (diff > 5 * 60 * 1000) {
        localStorage.clear();
      }
    }, 1000);
  }
  // localStorage.clear();

  return (
    <div className="App" >
      {signup && (
        <SignUpPage
          setSignup={setSignup}
          checkSignup={signup}
          setLogin={setLogin}
          setUserData={setUserData}
          // checkLogin={login}
        />
      )}

      {!signup && (
        <BrowserRouter>
          <Header
            setLogin={setLogin}
            checkLogin={login}
            setSignup={setSignup}
            checkSignup={signup}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <LandingPage
                  setLogin={setLogin}
                  checkLogin={login}
                  setSignup={setSignup}
                  checkSignup={signup}
                  setUserData={setUserData}
                />
              }
            />
            <Route
              exact
              path="/theatreSelection"
              element={
                <TheatreSelectionPage
                  setLogin={setLogin}
                  checkLogin={login}
                  setSignup={setSignup}
                  checkSignup={signup}
                  setUserData={setUserData}
                />
              }
            />
            <Route
              exact
              path="/seatSelection"
              element={
                <SeatSelectionPage
                  setLogin={setLogin}
                  checkLogin={login}
                  setSignup={setSignup}
                  checkSignup={signup}
                  setUserData={setUserData}
                />
              }
            />
            <Route
              exact
              path="/user"
              element={
                <UserPage setUserData={setUserData} userData={userData} />
              }
            />
            <Route exact path="/payment" element={<PaymentPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
