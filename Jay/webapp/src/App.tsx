import React, { useState, useEffect } from "react";
import Admin from "./components/admin";
// import './main.css';

// Components
import Navbar from "./components/Navbar";
import StudentsPage from "./components/students";

const App: React.FC = () => {
 
  const [currentPage, setCurrentPage] = useState('');

  const goToAdminPage = () => {
    setCurrentPage('admin');
  };

  const goToStudentPage = () => {
    setCurrentPage('student');
  };

  return (
    <div className="h-100">
      <Navbar />
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="button-container">

          <button onClick={goToAdminPage} className="btn btn-primary btn-lg"> Admin </button>
          <button onClick={goToStudentPage} className="btn btn-primary btn-lg"> Students </button>
      
      </div>
      {currentPage === 'admin' && <Admin/>}
      {currentPage == 'student' && <StudentsPage/>}
      </div>
    </div>
  );
};

export default App;
