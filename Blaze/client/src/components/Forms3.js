import React, { useState } from "react";
import axios from "axios";
import { addCandidate, StartElect, EndElect } from "../utils/operation";
import { address } from "../utils/contractAdd";
const Forms3 = (props) => {
  const [name, setName] = useState("");
  const [header, setHeader] = useState("");
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);
  const [sloading, setsLoading] = useState(false);
  const [imageHash, setImageHash] = useState("");

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      if (name === "" || header === "" || image === "") {
        alert("Please fill all the fields");
      } else {
        setLoading(true);
        await sendFileToIPFS();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      window.alert("Something went wrong");
      window.location.reload();
    }
  };

  const sendFileToIPFS = async (e) => {
    if (image) {
      try {
        const formData = new FormData();
        formData.append("file", image);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: process.env.REACT_APP_PINATA_API,
            pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("File Uploaded to IPFS: ");
        setImageHash(resFile.data.IpfsHash);
        const candidate = await addCandidate(
          address,
          name,
          header,
          resFile.data.IpfsHash
        );
        setLoading(false);
        alert("Candidate Added Successfully");
        console.log(candidate);
        window.location.reload();
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
        window.location.reload();
      }
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
                  {
                    <>
                      <h5 className="mt-4">
                        Candidate Count: {props?.candidateCount}
                      </h5>
                      <h5 className="mt-4">
                        Election Status:{" "}
                        {props?.storage?.isElectionStarted === false &&
                        props?.storage?.isElectionEnded === true ? (
                          <span className="text-danger">
                            Ended{" "}
                            <span
                              className="greenDot"
                              style={{
                                backgroundColor:
                                  props?.storage?.isElectionStarted === false
                                    ? "red"
                                    : "green",
                                borderRadius: "50%",
                                width: "10px",
                                height: "10px",
                                display: "inline-block",
                                marginLeft: "5px",
                              }}
                            ></span>
                          </span>
                        ) : props?.storage?.isElectionStarted === false ? (
                          <span className="text-danger">
                            Not Started{" "}
                            <span
                              className="greenDot"
                              style={{
                                backgroundColor:
                                  props?.storage?.isElectionStarted === false
                                    ? "red"
                                    : "green",
                                borderRadius: "50%",
                                width: "10px",
                                height: "10px",
                                display: "inline-block",
                                marginLeft: "5px",
                              }}
                            ></span>
                          </span>
                        ) : (
                          <span className="text-success">
                            Started{" "}
                            <span
                              className="greenDot"
                              style={{
                                backgroundColor:
                                  props?.storage?.isElectionStarted === false
                                    ? "red"
                                    : "green",
                                borderRadius: "50%",
                                width: "10px",
                                height: "10px",
                                display: "inline-block",
                                marginLeft: "5px",
                              }}
                            ></span>
                          </span>
                        )}
                      </h5>
                    </>
                  }
                </div>
                {props?.storage?.isElectionStarted === false ? (
                  <button
                    className="btn btn-primary"
                    disabled={
                      props?.candidateCount < 1 ||
                      loading ||
                      props?.storage?.isElectionStarted === true
                        ? true
                        : false
                    }
                    onClick={async () => {
                      setsLoading(true);
                      if (props?.candidateCount < 0) {
                        alert("Please add atleast 2 candidates");
                        setsLoading(false);
                        window.location.reload();
                      } else {
                        await StartElect(address);
                        setsLoading(false);
                        window.location.reload();
                      }
                    }}
                  >
                    {sloading ? "Starting Election..." : "Start Election"}
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={async () => {
                      setsLoading(true);
                      if (props?.candidateCount < 0) {
                        alert("Please add atleast 2 candidates");
                        setsLoading(false);
                      } else {
                        await EndElect(address);
                        setsLoading(false);
                        window.location.reload();
                      }
                    }}
                  >
                    {sloading ? "Ending Election..." : "End Election"}
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-8">
              <div className="contact-form">
                <h4 className="mb-5">Add Candidates For Election</h4>

                <form className="row">
                  <div className="col-md-12">
                    <input
                      type="text"
                      name="f-name"
                      placeholder="Candidate Full Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>

                  <div className="col-md-16">
                    <input
                      type="text"
                      name="header"
                      placeholder="Header/Slogan"
                      value={header}
                      onChange={(e) => {
                        setHeader(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-16">
                    <p className="text-left text-bold">
                      Upload Image (Max 1MB) <br />
                    </p>
                    <input
                      type="file"
                      name="image"
                      placeholder="Upload Image"
                      onChange={(e) => {
                        console.log(e.target.files[0]);
                        //check type
                        if (
                          e.target.files[0].type === "image/jpeg" ||
                          e.target.files[0].type === "image/png" ||
                          e.target.files[0].type === "image/jpg" ||
                          e.target.files[0].type === "image/gif"
                        ) {
                          setImage(e.target.files[0]);
                        } else {
                          console.log("Image type is not supported");
                        }
                      }}
                    />
                  </div>

                  <div className="col-md-12 text-right">
                    <input
                      name="submit"
                      value={loading ? "Loading..." : "Add Candidate"}
                      type="submit"
                      onClick={handleChange}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Forms3;
