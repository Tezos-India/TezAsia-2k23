import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { addStudent } from '../utils/operation';
import { fetchStorage } from '../utils/tzkt';


const StudentsPage = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [isAdmissionOpen, setStatus] = useState<boolean>(false);
  const [submitloading, setsubmitLoading] = useState<boolean>(false);


  useEffect(() => {
    // TODO 9 - Fetch players and tickets remaining from storage
    const fetchData = async () => {

        const storage = await fetchStorage();

        setStatus(storage.isAdmissionOpen)
    };

    fetchData();
  }, []);

  const handleSubmit = () => {
    setsubmitLoading(true)
    console.log('Submitted:', name);
    addStudent(name);
    setsubmitLoading(false)
  };


  return (
    <div>
        <div className="h-100">
       <Navbar/>
       <div className="admission-status">
        Admission Status:{' '}
        <span style={{ color: isAdmissionOpen ? 'green' : 'red'}}>
          {isAdmissionOpen ? 'Open' : 'Closed'}
        </span>
      </div>

    <div className="students-container">
      <h1>Enter Details</h1>
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type=""
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type=""
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button className="btn btn-primary btn-lg" onClick={handleSubmit}>{submitloading? "loading.." : "Submit"}</button>
    </div>
    </div>
    </div>
  );
};

export default StudentsPage;
