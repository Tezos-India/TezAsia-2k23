import React, { useState, useEffect } from "react";
import { setElectionDetails } from "../utils/operation";
import { useNavigate } from "react-router-dom";
import { address } from "../utils/contractAdd";
import axios from "axios";
const Forms = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [electionName, setElectionName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(props.storage);
    if (
      props.storage.adminEmail !== undefined &&
      props.storage.adminEmail !== ""
    ) {
      console.log("already registered");
      setAlreadyRegistered(true);
    }
  }, [props]);
  const handleChange = async (e) => {
    e.preventDefault();
    try {
      if (
        name === "" ||
        email === "" ||
        phone === "" ||
        electionName === "" ||
        orgName === ""
      ) {
        alert("Please fill all the fields");
      } else {
        setLoading(true);
        const election = await setElectionDetails(
          address,
          email,
          name,
          orgName,
          electionName,
          phone
        );
        //send a sms to the admin
        await axios.post("http://localhost:5000/send", {
          number: phone,
          message: `Hello ${name}, You have been successfully registered as an admin for ${electionName} election. You can now add candidates and verify them.`,
        });

        setLoading(false);
        alert("Election Details Added Successfully");
        console.log(election);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      window.alert("Something went wrong");
      window.location.reload();
    }
  };

  return (
    <>
      <section className="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="contact--info-area">
                <h3>Account</h3>
                <p> {props.account.address}</p>
                <div className="single-info">
                  <h5>Blockchain</h5>
                  <p>
                    <i className="fal fa-envelope"></i>
                    {props?.account?.network?.type}
                    <span
                      className="greenDot"
                      style={{
                        backgroundColor: "green",
                        borderRadius: "50%",
                        width: "10px",
                        height: "10px",
                        display: "inline-block",
                        marginLeft: "5px",
                      }}
                    ></span>
                  </p>
                </div>
                {alreadyRegistered ? (
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "20px",
                      gap: "10px",
                    }}
                  >
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/admin/candidates")}
                    >
                      Add Candidate
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/admin/verification")}
                    >
                      Verify Candidate
                    </button>
                  </span>
                ) : null}
              </div>
            </div>
            {alreadyRegistered ? (
              <div className="col-md-8">
                <div
                  className="contact-form"
                  style={{
                    backgroundColor: "lightgray",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px 0px #000000",
                    color: "black",
                  }}
                >
                  <h4>Election Details</h4>
                  <p>
                    <b>Admin Name :</b> {props.storage.adminName}
                  </p>
                  <p>
                    <b>Admin Email :</b> {props.storage.adminEmail}
                  </p>
                  <p>
                    <b>Admin Phone :</b> {props.storage.adminPhone}
                  </p>
                  <p>
                    <b>Election Name :</b> {props.storage.electionName}
                  </p>
                  <p>
                    <b>Organization Name :</b>{" "}
                    {props.storage.electionDescription}
                  </p>
                </div>
              </div>
            ) : (
              <div className="col-md-8">
                <div className="contact-form">
                  <h4>Election Details</h4>
                  <p>About Admin</p>
                  <form className="row">
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="f-name"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        name="phone"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </form>
                  <p>About Election</p>
                  <form action="#" method="post" className="row">
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="suject"
                        placeholder="Election Name"
                        value={electionName}
                        onChange={(e) => setElectionName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="suject"
                        placeholder="Organisation Name"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6"></div>
                    <div className="col-md-12 text-right">
                      <input
                        name="submit"
                        value={loading ? "Loading..." : "Submit"}
                        type="submit"
                        onClick={handleChange}
                      />
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Forms;
