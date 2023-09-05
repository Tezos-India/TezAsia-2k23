import { useState,useEffect, useContext } from "react";
import Navbar from "./Navbar";
import FileUpload from "./FileUpload"
import Display from "./Display";
import { Link} from "react-router-dom";
import "./Main.css";
import { context } from "../App";
import Modal from "./Modal";



 const Main = () => {

    const {modalOpen , account} = useContext(context);

    const setContent = async ()=>{
      // setModalOpen(true);
      // setSelectImg(null);
      
    }




  return (
    <>

    
    <div className="h-300">


      
    {!modalOpen && <Navbar />}


      {/* <Navbar /> */}
      {/* <div 
      style={{
        paddingTop: '75px'
      }}
      ></div> */}
      {!modalOpen && (

        <Link to="/access">
        <button className="share">
          See Access
        </button>
        </Link>
      )}
      {modalOpen && (
        <Modal></Modal>
      )}

    
      

      <div className="App" style={{marginTop:"-55px"}}>
        <h1 style={{ color: "green",fontFamily:"sans-serif",fontWeight:"bold",textShadow:"5px 5px 5px 5px red"}}>BlockDrive</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ color: "white" ,fontSize:"17px"}}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload account={account}
        ></FileUpload>
        <Display ></Display>
      </div>
    </div>
    {/* </context.Provider> */}

</>

    
      
  );
    
};

export default Main;
// export {context}

