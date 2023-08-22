import React from "react";
import { addRecord } from "../utils/operation";
import axios from "axios";

export default function NewDiagnosisForm(props) {
    let form = props.form
    const [newDiagnosis, setNewDiagnosis] = React.useState({
        diagnosis: "", 
        docType: "",
        doctorName: "",
        document: "",
        symptoms: "",
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setNewDiagnosis(prevValue => (
               { ...prevValue,
                [name]: value
               })
        )
    }

    const submitBut = async (event) => {
        event.preventDefault()
        let data = {
          "aadhar": form.aadhar,
          "privateKey":  form.secretKey,
          "name": form.name,
          "diagnosis": newDiagnosis.diagnosis,
          "docType": newDiagnosis.docType,
          "docName": newDiagnosis.doctorName,
          "document": newDiagnosis.document,
          "symptoms": newDiagnosis.symptoms
        };
  
        console.log(data)
        
        const url =  'https://efficacious-writing-production.up.railway.app/api/makeDiagnosis'
        let config = {
          maxBodyLength: Infinity,
          headers: { 
            'Content-Type': 'application/json'
          }
        };
        console.log("Making the call")
        axios.post(url, data, config)
        .then(async (response) => {
          console.log(response.data)
          console.log(JSON.stringify(response.data));
          await addRecord(response.data.symptoms, response.data.diagnosis, response.data.name, response.data.document,
            response.data.DocName, response.data.DocType, response.data.userAadhar, response.data.RSAencryptedcipherKey).
            then(
              (response) => {
                // alert("Diagnosis added")
              }
            ).catch((error) => {
                // alert("Error Occured", error)
            })
        })
        .catch((error) => {
          if ("response" in error){
            if ("data" in error.response){
                // alert(error.response.data.message)
            }
            console.log(error.response.data.message)
          }
          else{
          console.log("Error Occured");
          }
        });
        // await addRecord(newDiagnosis.symptoms, newDiagnosis.diagnosis, props.patientName, newDiagnosis.document,
        //     newDiagnosis.doctorName, newDiagnosis.docType, props.userAadhar)
        

        // console.log("added diagnostics" ,newDiagnosis)
        // alert("added diagnostics")
    }
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form>
            <div className="mb-3">
              <label htmlFor="diagnosis" className="form-label">
                Diagnosis
              </label>
              <input
                type="text"
                className="form-control"
                id="diagnosis"
                name="diagnosis"
                value={newDiagnosis.diagnosis}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="docType" className="form-label">
                Document Type
              </label>
              <input
                type="text"
                className="form-control"
                id="docType"
                name="docType"
                value={newDiagnosis.docType}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="doctorName" className="form-label">
                Doctor Name
              </label>
              <input
                type="text"
                className="form-control"
                id="doctorName"
                name="doctorName"
                value={newDiagnosis.doctorName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="document" className="form-label">
                Document
              </label>
              <input
                type="text"
                className="form-control"
                id="document"
                name="document"
                value={newDiagnosis.document}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="symptoms" className="form-label">
                Symptoms
              </label>
              <input
                type="text"
                className="form-control"
                id="symptoms"
                name="symptoms"
                value={newDiagnosis.symptoms}
                onChange={handleChange}
              />
            </div>
            
            <button className="btn btn-primary" onClick={submitBut}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
