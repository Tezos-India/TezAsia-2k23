import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';

const HospitalInfo = () => {
  const [hospitalData, setHospitalData] = useState([]);

  useEffect(() => {
    // Fetch hospital and doctor data from the API
    const fetchHospitalData = async () => {
      try {
        const response = await axios.get("https://efficacious-writing-production.up.railway.app/api/getHospital");
        setHospitalData(response.data.data);
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    };

    fetchHospitalData();
  }, []);


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div>
        {hospitalData.map(hospital => (
          <div key={hospital.hospialName}>
            <h2>{hospital.hospialName}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {hospital.doctors.map(doctor => (
                <Card
                  key={doctor.aadhar}
                  title={doctor.name}
                  sex={doctor.sex}
                  age={doctor.age}
                  speciality={doctor.speciality}
                  ishospital={true}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalInfo;