import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeEight from "./components/Home/";
import Loader from "./components/Helper/Loader";
import Admin from "./Pages/Admin/Admin";
import Registration from "./Pages/Registration/Registration";
import AddCandidate from "./Pages/AddCandidate/AddCandidate";
import Verificaton from "./Pages/Verification/Verificaton";
import Voting from "./Pages/Voting/Voting";
import Result from "./Pages/Result/Result";
import Donate from "./Pages/Donate/Donate";
function Routess() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });
  return (
    <>
      {loading && (
        <div className={`appie-loader ${loading ? "active" : ""}`}>
          <Loader />
        </div>
      )}
      <div className={`appie-visible ${loading === false ? "active" : ""}`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeEight />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/admin/candidates" element={<AddCandidate />} />
            <Route path="/admin/verification" element={<Verificaton />} />
            <Route path="/voting" element={<Voting />} />
            <Route path="/results" element={<Result />} />
            <Route path="/donate" element={<Donate />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default Routess;
