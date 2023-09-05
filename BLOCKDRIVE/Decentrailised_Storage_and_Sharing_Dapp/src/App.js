import { useState,useEffect, useContext } from "react";
import { createContext } from "react";
import { getAccount } from "./utils/wallet";
import { Routes,Route} from "react-router-dom";
import Main from "./components/Main";
import "./App.css";
import Access from "./components/Access";


const context=createContext({});
 const App = () => {

  const [account, setAccount] = useState(null);
  const [loading,setLoading] = useState(false);
  const [selectImg,setSelectImg] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);


  


   const hlo= async () => {
      const account = await getAccount();
      setAccount(account);

    }
    useEffect(()=>{
      hlo();
    })



  return (
    <>
      <context.Provider value={{account,setAccount,hlo,loading,setLoading,modalOpen,setModalOpen,selectImg,setSelectImg}}>


      <Routes>
        <Route path="/" element={<Main />} />
      
        <Route path="/access" element={<Access />} />
        
      </Routes>
      </context.Provider>

      </>      
  );
    
};

export default App;
export {context}

