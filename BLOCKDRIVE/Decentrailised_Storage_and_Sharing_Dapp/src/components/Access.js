import { useContext, useState ,useEffect } from "react";
import Navbar from "./Navbar";
import { context } from "../App";
import "./Access.css";
import { getAccount } from "../utils/wallet";
import { fetchStorage } from "../utils/tzkt";
import { RxCrossCircled } from "react-icons/rx";
import { tezos } from "../utils/tezos";


const Access = ()=>{

    const {account,setLoading,loading} = useContext(context);
    const [rm,setRm] = useState(null);
    const [data, setData] = useState(""); 


    const remove= async (e)=>{
      const v = e.target.value;
      console.log(v);
      setRm(v)
    }

    const getData = async() => {


    const storage = await fetchStorage();
    const account = await getAccount();
        const my_map = storage.access_user;
        if(my_map.hasOwnProperty(account)){
          const my_list = my_map[account];
          if(my_list.hasOwnProperty(rm)){
            const my_imgs = my_list[rm];
            const imgs = Object.keys(my_imgs);
            console.log(imgs);
            if(imgs[0]){
              const str = imgs.toString(); 
            const str_array = str.split(",");
                    
          const images = str_array.map((item, i) => {
            return (
                <a key={i}>
                <img
                  key={i}
                  src={`https://gateway.pinata.cloud/ipfs/${item.substring(34)}`}
                  alt="new"
                  className="image-list"
                ></img>
                <RxCrossCircled style={{cursor:"pointer",display:"absolute",marginTop:"-580px",
                        color:"red",marginLeft:"210px",fontSize:"30px"}} onClick={()=>removeDevice(item)}/>

              </a>
            );
          });
                    setData(images);

            }
            else{
              alert("No images is shared");
            }
            

        }}}
        const removeDevice = async (item) => {
          if(rm && item){
            try{
              const contract = await tezos.wallet.at("KT1TWcZKqV1V2iTVrPW7Y1rivSsFZjk9TaS6");
              const op = await contract.methods.disallow(rm,item).send();
              setLoading(true);
              await op.confirmation(1);
              setLoading(false);
              alert("Address successfully removed");
              window.location.reload();
      
      
      
          }catch(error){
            console.log(error);
          }}
          else{
            alert("Choose correct fields");
          }
        }
        









    useEffect(() => {
  
    
    
      // (async () => {
      const accessList = async () => {
        console.log(rm);
  
        
        const account = await getAccount();
        const storage = await fetchStorage();
        console.log(account);
        const my_m = storage.access_user;
          if(my_m.hasOwnProperty(account)){
            const my_l = my_m[account];
            // setLS(my_l);
            
            const l = Object.keys(my_l);
            
            let select = document.querySelector("#selectNumber");
            console.log(select);
            for (let i = 0; i < l.length; i++) {
              let opt = l[i];
              let e1 = document.createElement("option");
              e1.textContent = opt;
              e1.value = opt;
              select.appendChild(e1);
            }
          }
  
    
        
      };
      {accessList();}
    // })();
    },[] );


    return(

      <>
      <Navbar/>
       <div 
      style={{
        paddingTop: '140px'
      }}
      ></div>
      <div className="App" style={{marginTop:"-55px"}}>
        <h1 style={{ color: "green",fontFamily:"sans-serif",fontWeight:"bold",textShadow:"5px 5px 5px 5px red"}}>BlockDrive</h1>
        <div class="bg"></div>
        <div class="bg bg2"></div>
        <div class="bg bg3"></div>

        <p style={{ color: "white" ,fontSize:"17px"}}>
          Account : {account ? account : "Not connected"}
        </p>
      </div>
      <div className="select">
      <select id="selectNumber" className="" onChange={(e)=>remove(e) }>
              <option className="option" >wallet with access</option>
              </select>

              <button className="center button" onClick={getData} >
        Get Files
      </button>
      </div>
      <div style={{display:"flex",marginLeft:"2%",marginBottom:"30px",marginTop:"90px"}}>

<hr className="divider" style={{marginRight:"5px",width:"40%", height:"4px"}} /> 
<span style={{marginTop:"-22px",fontWeight:"bold",fontSize:"26px",marginLeft:"17px",marginRight:"17px",color:"blue",marginTop:"-27px"}}>Uploaded Images </span> 
<hr className="divider" style={{marginLeft:"5px",fontSize:"25px", height:"4px",width:"40%"}} />
</div>
<div className="image-list">{account ? data : null}</div>

{/* {loading? 
        <div className="ModalBackground">
        <div class="loader"></div>
      </div>
        : null} */}

      </>

    


    );

}

export default Access;
