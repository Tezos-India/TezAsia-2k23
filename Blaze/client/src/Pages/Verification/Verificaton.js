import React from "react";
import AdminHeader from "../../components/Header/AdminHeader";
import { getAccount, getFullActitveAccount } from "../../utils/wallet";
import { fetchStorage, verifyVoter } from "../../utils/operation";
import { address } from "../../utils/contractAdd";
import Drawer from "../../components/Mobile/Drawer copy";
import useToggle from "../../components/Hooks/useToggle";
import axios from "axios";
const Verificaton = () => {
  const [drawer, setDrawer] = useToggle(false);
  const [account, setAccount] = React.useState("");
  const [accoutDetails, setAccountDetails] = React.useState({});
  const [storage, setStorage] = React.useState({});
  const [voterCount, setVoterCount] = React.useState(0);
  const [voter, setVoter] = React.useState([]);
  const [verifying, setVerifying] = React.useState(false);
  React.useEffect(() => {
    getAccount().then((account) => {
      setAccount(account);
      console.log(account);
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
      setVoterCount(storage.voterCount.c[0]);
      if (storage.voterCount.c[0] > 0) {
        axios
          .get(
            `https://api.ghostnet.tzkt.io/v1/bigmaps/${storage.voters.id.c[0]}/keys`
          )
          .then((res) => {
            setVoter(res.data);
            console.log(res.data);
          });
      }
    });
  };

  return (
    <>
      <AdminHeader drawer={drawer} action={setDrawer.toggle} />
      <Drawer drawer={drawer} action={setDrawer.toggle} />

      {/* <div className="container mt-5"> */}
      <div
        className="row"
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Voter List</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead className=" text-primary">
                    <tr>
                      <th>Address</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Verification</th>
                      <th>Voter Id</th>
                      <th>Voter Card</th>
                      <th>Current Image</th>
                      <th>Verify</th>
                    </tr>
                  </thead>
                  <tbody>
                    {voter.map((item, index) => {
                      return (
                        <tr key={index}>
                          {/* //short this address */}
                          <td>{item.value.voterAddress.slice(0, 10)}...</td>
                          <td>{item.value.name}</td>
                          <td>{item.value.email}</td>
                          <td>
                            {item.value.isVerified === true
                              ? "Verified"
                              : "Not Verified"}
                          </td>
                          <td>{item.value.govId}</td>
                          <td>
                            <a
                              href={`https://gateway.pinata.cloud/ipfs/${item.value.voterIdImage}`}
                              target="_blank"
                            >
                              See Voter Card
                            </a>
                          </td>
                          <td>
                            <a
                              href={`https://gateway.pinata.cloud/ipfs/${item.value.currentImage}`}
                              target="_blank"
                            >
                              See Current Photo
                            </a>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary"
                              disabled={
                                item.value.isVerified === true ? true : false
                              }
                              onClick={() => {
                                setVerifying(true);
                                verifyVoter(
                                  address,
                                  item.value.voterAddress
                                ).then(async (res) => {
                                  await axios.post(
                                    "http://localhost:5000/send",
                                    {
                                      number: item.value.phone,
                                      message: `Your account has been verified by admin. Now you can vote.`,
                                    }
                                  );
                                  console.log(res);
                                  setStoragee();
                                  setVerifying(false);
                                });
                              }}
                            >
                              {verifying === true ? (
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                              ) : item.value.isVerified === true ? (
                                "Verified"
                              ) : (
                                "Verify"
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Verificaton;
