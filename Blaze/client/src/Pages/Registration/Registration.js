import React from "react";
import Drawer from "../../components/Mobile/Drawer copy";
import Header from "../../components/Header/Header";
import { getAccount, getFullActitveAccount } from "../../utils/wallet";
import useToggle from "../../components/Hooks/useToggle";
import Forms2 from "../../components/Forms2";

const Registration = () => {
  const [drawer, setDrawer] = useToggle(false);
  const [account, setAccount] = React.useState("");
  const [accoutDetails, setAccountDetails] = React.useState({});

  React.useEffect(() => {
    getAccount().then((account) => {
      setAccount(account);
      // console.log(account);
    });

    getFullActitveAccount().then((account) => {
      setAccountDetails(account);
      // console.log(account);
    });
  }, [account]);

  return (
    <>
      <Drawer drawer={drawer} action={setDrawer.toggle} />
      <Header drawer={drawer} action={setDrawer.toggle} />
      <Forms2 account={accoutDetails} accountt={account} />
    </>
  );
};

export default Registration;
