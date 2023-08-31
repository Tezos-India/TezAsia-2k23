import React, { useState, useEffect } from "react";
import AdminHeader from "../../components/Header/AdminHeader";
import useToggle from "../../components/Hooks/useToggle";
import { getAccount, getFullActitveAccount } from "../../utils/wallet";
import Drawer from "../../components/Mobile/Drawer copy";
import Forms3 from "../../components/Forms3";
import { fetchStorage } from "../../utils/operation";
import axios from "axios";
import { address } from "../../utils/contractAdd";
import Loader from "../../components/Loader/Loader";
import Card from "../../components/Card/Card";
const AddCandidate = () => {
  const [drawer, setDrawer] = useToggle(false);
  const [account, setAccount] = React.useState("");
  const [accoutDetails, setAccountDetails] = React.useState({});
  const [storage, setStorage] = useState("");
  const [data, setData] = useState([]);
  const [candidateCount, setCandidateCount] = useState(0);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);
    getAccount().then((account) => {
      setAccount(account);
      console.log(account);
    });
    fetchData();
    getFullActitveAccount().then((account) => {
      setAccountDetails(account);
    });
    setLoading(false);
  }, [account]);

  // const url = `https://api.ghostnet.tzkt.io/v1/bigmaps/272928/keys`;
  const fetchData = async () => {
    setLoading(true);
    const storage = await fetchStorage(address);
    console.log(storage);
    console.log(storage.candidates.id.c[0]);
    // console.log(storage.candidateCount.c[0]); // candidate count
    setCandidateCount(storage.candidateCount.c[0]);
    setStorage(storage);
    const response = await axios.get(
      `https://api.ghostnet.tzkt.io/v1/bigmaps/${storage.candidates.id.c[0]}/keys`
    );
    setData(response.data);
    setLoading(false);
  };
  return (
    <>
      <Drawer drawer={drawer} action={setDrawer.toggle} />
      <AdminHeader drawer={drawer} action={setDrawer.toggle} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Forms3
            account={accoutDetails}
            candidateCount={candidateCount}
            data={data}
            storage={storage}
          />
          {candidateCount > 0 ? (
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "50px",
                width: "95%",
                margin: "auto",
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "50px",
                }}
              >
                List of Candidates
              </h2>
              {data.map((item) => {
                return (
                  // <div
                  //   className="col-lg-3 col-md-6"
                  //   style={{
                  //     minHeight: "400px",
                  //   }}
                  // >
                  //   <div
                  //     className="appie-single-counter mt-30 wow animated fadeInUp"
                  //     data-wow-duration="2000ms"
                  //     data-wow-delay="200ms"
                  //   >
                  //     <div className="counter-content">
                  //       <div className="icon">
                  //         <img
                  //           src={`https://gateway.pinata.cloud/ipfs/${item.value.image}`}
                  //           alt=""
                  //           style={{
                  //             width: "100px",
                  //             height: "100px",
                  //             borderRadius: "50%",
                  //             objectFit: "cover",
                  //           }}
                  //         />
                  //       </div>
                  //       <h3 className="title">{item.value.name}</h3>
                  //       <p>{item.value.header}</p>
                  //     </div>
                  //   </div>
                  // </div>
                  <Card item={item} />
                );
              })}
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default AddCandidate;
