import React, { useState, useEffect } from "react";
import axios from "axios";
import CameraComponent from "./CameraComponent";
import { registerAsVoter } from "../utils/operation";
import { address } from "../utils/contractAdd";
import { fetchStorage } from "../utils/operation";
import "../Pages/Registration/style.css";

const Forms2 = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [voterIdno, setVoterIdno] = useState("");
  const [fileImg, setFileImg] = useState("");
  const [fileImgUrl, setFileImgUrl] = useState("");
  const [registering, setRegistering] = useState(false);
  const [storage, setStorage] = React.useState({});
  const [voterCount, setVoterCount] = React.useState(0);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [voterDetails, setVoterDetails] = React.useState({});
  const [loadingInfo, setLoadingInfo] = React.useState(false);
  const [openCamera, setOpenCamera] = React.useState(false);

  React.useEffect(() => {
    setLoadingInfo(true);
    fetchStorage(address).then((storage) => {
      setStorage(storage);
      console.log(storage.voterCount.c[0]);
      setVoterCount(storage.voterCount.c[0]);
      if (storage.voterCount.c[0] > 0) {
        axios
          .get(
            `https://api.ghostnet.tzkt.io/v1/bigmaps/${storage.voters.id.c[0]}/keys`
          )
          .then((res) => {
            console.log(res.data);
            res.data.forEach((voter) => {
              if (voter.key === props.accountt) {
                setIsRegistered(true);
                setVoterDetails(voter.value);
                console.log(voter.value);
              }
            });
          });
      }
    });
    setLoadingInfo(false);
  }, [props.accountt]);
  const handleChange = async (e) => {
    e.preventDefault();
    try {
      if (
        name === "" ||
        email === "" ||
        phone === "" ||
        voterIdno === "" ||
        fileImg === "" ||
        fileImgUrl === ""
      ) {
        alert("Please fill all the fields");
      } else {
        console.log(
          name,
          email,
          phone,
          voterIdno,
          fileImg,
          dataURLtoFile(fileImgUrl, "image.png")
        );

        setRegistering(true);
        console.log("Registering as Voter");
        const currentPicture = await sendFileToIPFS(
          dataURLtoFile(fileImgUrl, "image.png")
        );
        const currentVoterId = await sendFileToIPFS(fileImg);
        console.log(currentPicture, currentVoterId);
        const voter = await registerAsVoter(
          address,
          name,
          email,
          phone,
          voterIdno,
          currentPicture,
          currentVoterId
        );
        await axios.post("http://localhost:5000/send", {
          number: phone,
          message: `You have been registered as a voter for the upcoming elections. Your voter id is ${voterIdno}. You can give your vote on after your profile is verified and the election starts. Thank you for registering.`,
        });

        setRegistering(false);
        alert("Voter Registered Successfully");
        console.log(voter);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setRegistering(false);
      window.alert("Something went wrong");
      window.location.reload();
    }
  };

  const sendFileToIPFS = async (fileImg) => {
    try {
      const formData = new FormData();
      formData.append("file", fileImg);
      const resFile = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: process.env.REACT_APP_PINATA_API,
          pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File Uploaded to IPFS: ");
      console.log(resFile.data.IpfsHash);
      return resFile?.data?.IpfsHash;
    } catch (error) {
      console.log("Error sending File to IPFS: ");
      console.log(error);
    }
  };

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  return (
    <>
      {loadingInfo ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
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
                    <div className="single-info">
                      <h5>Registration Status</h5>
                      <p className="mb-2">
                        <i className="fal  fa-user"></i>
                        {isRegistered ? "Registered" : "Not Registered"}
                        <span
                          // className="greenDot"
                          style={{
                            backgroundColor: isRegistered ? "green" : "red",
                            borderRadius: "50%",
                            width: "10px",
                            height: "10px",
                            display: "inline-block",
                            marginLeft: "5px",
                          }}
                        ></span>
                      </p>
                      <p className="mb-2">
                        <i className="fal  fa-badge-check"></i>
                        {voterDetails.isVerified ? "Verified" : "Not Verified"}
                        <span
                          // className="greenDot"
                          style={{
                            backgroundColor: voterDetails.isVerified
                              ? "green"
                              : "red",
                            borderRadius: "50%",
                            width: "10px",
                            height: "10px",
                            display: "inline-block",
                            marginLeft: "5px",
                          }}
                        ></span>
                      </p>
                      <p className="mb-2">
                        <i className="fal fa-ticket"></i>
                        {voterDetails.hasVoted ? "Voted" : "Not Voted"}
                        <span
                          // className="greenDot"
                          style={{
                            backgroundColor: voterDetails.hasVoted
                              ? "green"
                              : "red",
                            borderRadius: "50%",
                            width: "10px",
                            height: "10px",
                            display: "inline-block",
                            marginLeft: "5px",
                          }}
                        ></span>
                      </p>

                      {!voterDetails?.isVerified && (
                        <p>Waiting for Admin to verify your account</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="contact-form">
                    <h4>
                      {isRegistered
                        ? "Registration Info"
                        : "Register For Election"}
                    </h4>
                    <p>About You</p>
                    <form className="row">
                      <div className="col-md-12">
                        <input
                          type="text"
                          name="f-name"
                          placeholder="Full Name"
                          value={isRegistered ? voterDetails.name : name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={isRegistered}
                        />
                      </div>

                      <div className="col-md-6">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={isRegistered ? voterDetails.email : email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isRegistered}
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          type="number"
                          name="phone"
                          placeholder="Phone Number"
                          value={isRegistered ? voterDetails.phone : phone}
                          onChange={(e) => setPhone(e.target.value)}
                          disabled={isRegistered}
                        />
                      </div>
                    </form>
                    <p>Verification Details</p>
                    <form action="#" method="post" className="row">
                      <div className="col-md-12">
                        <input
                          type="text"
                          name="suject"
                          placeholder="Voter ID"
                          value={
                            isRegistered
                              ? voterDetails.voterIdNumber
                              : voterIdno
                          }
                          onChange={(e) => setVoterIdno(e.target.value)}
                          disabled={isRegistered}
                        />
                      </div>
                      {isRegistered ? (
                        <>
                          <div className="col-md-6">
                            {/* <label htmlFor="file">Voter ID Card</label> */}
                            {/* <img
                              src={`https://gateway.pinata.cloud/ipfs/${voterDetails.voterIdImage}`}
                              style={{
                                height: "100%",
                                width: "100%",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                              }}
                            /> */}
                            <a
                              href={`https://gateway.pinata.cloud/ipfs/${voterDetails.voterIdImage}`}
                              target="_blank"
                            >
                              View Voter ID
                            </a>
                          </div>
                          <div className="col-md-6">
                            {/* <label htmlFor="file">Voter ID Card</label>
                            <img
                              src={`https://gateway.pinata.cloud/ipfs/${voterDetails.currentImage}`}
                              style={{
                                width: "100%",
                                height: "100%",

                                border: "1px solid #ccc",
                                borderRadius: "4px",
                              }}
                            /> */}
                            <a
                              href={`https://gateway.pinata.cloud/ipfs/${voterDetails.currentImage}`}
                              target="_blank"
                            >
                              View Current Image
                            </a>
                          </div>
                        </>
                      ) : (
                        <div className="col-md-12">
                          <label htmlFor="file">Upload Voter ID Card</label>
                          <input
                            type="file"
                            name="suject"
                            placeholder="Voter ID Card"
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              padding: "6px 12px",
                              width: "100%",
                            }}
                            onChange={(e) => {
                              if (e.target.files[0].type.includes("image")) {
                                setFileImg(e.target.files[0]);
                              } else {
                                setFileImg("");
                                alert("Only image files are allowed");
                              }
                            }}
                          />
                        </div>
                      )}

                      {isRegistered ? (
                        <span className="mb-5"></span>
                      ) : (
                        <div className="col-md-6">
                          <button
                            className="btn btn-primary mt-2 specia"
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenCamera(!openCamera);
                            }}
                          >
                            {openCamera ? "Close Camera" : "Open Camera"}
                          </button>

                          {openCamera && (
                            <CameraComponent
                              setFileImgUrl={setFileImgUrl}
                              openCamera={openCamera}
                            />
                          )}
                        </div>
                      )}
                      <div className="col-md-6">
                        {fileImgUrl !== "" && (
                          <>
                            <img
                              src={fileImgUrl}
                              alt="img"
                              className="specialImage"
                              style={{
                                width: "110%",
                                marginTop: "57px",
                                height: "260px",
                              }}
                            />
                            <button
                              className="btn btn-primary mt-2 mb-2"
                              onClick={(e) => {
                                e.preventDefault();
                                setFileImgUrl("");
                              }}
                            >
                              Remove/Refresh
                            </button>
                          </>
                        )}
                      </div>

                      <div className="col-md-12 text-right">
                        {isRegistered ? (
                          <input
                            name="submit"
                            value={" Already Registered For Election"}
                            type="submit"
                            disabled={true}
                          />
                        ) : (
                          <input
                            name="submit"
                            value={
                              registering
                                ? "Registering..."
                                : "Register For Election"
                            }
                            type="submit"
                            onClick={handleChange}
                          />
                        )}
                      </div>
                      {registering && (
                        <div className="col-md-12 text-center">
                          <p>
                            Please dont refresh or close the page while
                            registering
                          </p>
                          <p>
                            It may take some time to register you for the
                            election
                          </p>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Forms2;
