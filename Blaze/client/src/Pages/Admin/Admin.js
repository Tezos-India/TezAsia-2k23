import React from "react";
import Drawer from "../../components/Mobile/Drawer copy";
import Footer from "../../components/Footer/Footer";
import AdminHeader from "../../components/Header/AdminHeader";
import useToggle from "../../components/Hooks/useToggle";
import { getAccount, getFullActitveAccount } from "../../utils/wallet";
import Forms from "../../components/Forms";
import { fetchStorage } from "../../utils/operation";
import { address } from "../../utils/contractAdd";

const Admin = () => {
  const [drawer, setDrawer] = useToggle(false);
  const [account, setAccount] = React.useState("");
  const [accoutDetails, setAccountDetails] = React.useState({});
  const [storage, setStorage] = React.useState({});
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
    });
  };

  return (
    <>
      <Drawer drawer={drawer} action={setDrawer.toggle} />
      <AdminHeader drawer={drawer} action={setDrawer.toggle} />
      <Forms account={accoutDetails} storage={storage} />
    </>
  );
};

export default Admin;
