import React from "react";
import AdminHeader from "../../components/Header/AdminHeader";
import { getAccount, getFullActitveAccount } from "../../utils/wallet";
import { fetchStorage, vote } from "../../utils/operation";
import { address } from "../../utils/contractAdd";
import Drawer from "../../components/Mobile/Drawer copy";
import useToggle from "../../components/Hooks/useToggle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Voting = () => {
  const [drawer, setDrawer] = useToggle(false);
  const [account, setAccount] = React.useState("");
  const [accoutDetails, setAccountDetails] = React.useState({});
  const [storage, setStorage] = React.useState({});
  const [candidateCount, setCandidateCount] = React.useState(0);
  const [candidate, setCandidate] = React.useState([]);
  const [voting, setVoting] = React.useState(false);
  const [voterDetails, setVoterDetails] = React.useState({});
  const [voterCount, setVoterCount] = React.useState(0);
  const [isRegistered, setIsRegistered] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    getAccount().then((account) => {
      if (!account) {
        window.alert("Please connect your wallet");
        navigate("/");
      }
      setAccount(account);
      console.log(account);
    });
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
              if (voter.key === account) {
                setIsRegistered(true);
                setVoterDetails(voter.value);
                console.log(voter.value);
              }
            });
          });
      }
    });
    setStoragee();

    getFullActitveAccount().then((account) => {
      setAccountDetails(account);
    });
  }, [account]);
  const setStoragee = async () => {
    await fetchStorage(address).then((storage) => {
      setStorage(storage);
      console.log(storage);
      setCandidateCount(storage.candidateCount.c[0]);
      if (storage.candidateCount.c[0] > 0) {
        axios
          .get(
            `https://api.ghostnet.tzkt.io/v1/bigmaps/${storage.candidates.id.c[0]}/keys`
          )
          .then((res) => {
            setCandidate(res.data);
            console.log(res.data);
          });
      }
    });
  };

  return (
    <>
      <Drawer drawer={drawer} action={setDrawer.toggle} />
      <AdminHeader drawer={drawer} action={setDrawer.toggle} />

      <div className="container mt-100 pl-4">
        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#1a1a1a",
          }}
        >
          Candidate Count: {candidateCount}
        </span>
        {!voterDetails.isRegistered ? (
          <span
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#1a1a1a",
              marginLeft: "20px",
            }}
          >
            Please Register to Vote
          </span>
        ) : (
          !voterDetails.isVerified && (
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#1a1a1a",
                marginLeft: "20px",
              }}
            >
              Please Verify to Vote
            </span>
          )
        )}
        {!storage.isElectionStarted ? (
          <span
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#1a1a1a",
              marginLeft: "20px",
            }}
          >
            Election is not started
          </span>
        ) : (
          storage.isElectionEnded && (
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#1a1a1a",
                marginLeft: "20px",
              }}
            >
              Election is ended
            </span>
          )
        )}
        {voterDetails.hasVoted && (
          <span
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#1a1a1a",
              marginLeft: "20px",
            }}
          >
            You have already voted
          </span>
        )}
        <div
          className="row"
          style={{
            marginTop: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {candidate.map((item, index) => {
            return (
              <div className="col-md-4">
                <div
                  className="card

                "
                  style={{
                    width: "18rem",
                    border: "#1a1a1a solid 1px",
                    borderRadius: "5px",
                    backgroundColor: "#e3e4e6",
                  }}
                >
                  <div
                    className="card-body"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={`https://gateway.pinata.cloud/ipfs/${item.value.image}`}
                      alt="candidate"
                      className="img-fluid"
                      style={{
                        borderRadius: "50%",
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <h5 className="card-title" style={{ marginTop: "10px" }}>
                      {item.value.name}
                    </h5>
                    <p
                      className="card-text"
                      style={{
                        marginTop: "10px",
                        textAlign: "center",
                        fontSize: "14px",
                        marginBottom: "10px",
                      }}
                    >
                      {item.value.header}
                    </p>
                    <button
                      className="btn btn-primary"
                      style={{
                        width: "100%",
                        backgroundColor: "#1a1a1a",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                      disabled={
                        voting ||
                        !voterDetails.isRegistered ||
                        !voterDetails.isVerified ||
                        voterDetails.hasVoted ||
                        !storage.isElectionStarted ||
                        storage.isElectionEnded
                      }
                      onClick={() => {
                        setVoting(true);
                        console.log(index);

                        vote(address, index).then(async (res) => {
                          await axios.post("http://localhost:5000/send", {
                            number: voterDetails.phone,
                            message: `You have successfully voted for ${item.value.name}. Thank you for voting.`,
                          });
                          setVoting(false);
                          setStoragee();
                          window.location.reload();
                        });
                      }}
                    >
                      {voting ? "Voting..." : "Vote"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Voting;
