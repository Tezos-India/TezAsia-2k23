import React from "react";
import AdminHeader from "../../components/Header/AdminHeader";
import { getAccount, getFullActitveAccount } from "../../utils/wallet";
import { fetchStorage, donete } from "../../utils/operation";
import { address } from "../../utils/contractAdd";
import Drawer from "../../components/Mobile/Drawer copy";
import useToggle from "../../components/Hooks/useToggle";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Donate = () => {
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
  const [donation, setDonation] = React.useState(0);
  const [donationAmount, setDonationAmount] = React.useState(0);
  const [donating, setDonating] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    getAccount().then((account) => {
      if (!account) {
        window.alert("Please connect your wallet");
        navigate("/");
      }
      setAccount(account);
    });
    fetchStorage(address).then((storage) => {
      setStorage(storage);

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
      <div className="container mt-5">
        <h3
          className="text-center"
          style={{ fontWeight: "bold", marginTop: "100px" }}
        >
          Donate To Charity
        </h3>
        <div
          className="form-group w-50 mt-5 mx-auto my-5 "
          style={{
            marginTop: "100px",
          }}
        >
          <label htmlFor="donate">Add amount to donate</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            placeholder="Enter amount"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary mt-3 w-100"
            onClick={(e) => {
              donete(address, donationAmount);
            }}
          >
            {donating ? "Donating..." : "Donate"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Donate;
