import { useState , useContext } from "react";
import "./Display.css";
import { fetchStorage } from "../utils/tzkt";
import { getAccount } from "../utils/wallet";
import {VscChromeClose} from "react-icons/vsc";
import {RxCrossCircled} from "react-icons/rx";
import { tezos } from "../utils/tezos";
import { context } from "../App";
import Modal from "./Modal";
import {BiShareAlt} from "react-icons/bi"


const Display = () => {
  const [data, setData] = useState(""); 
  const [account, setAccount] = useState(null);
  const [MyL,setMyL] = useState();
  const {loading,setLoading} = useContext(context);
  const {modalopen,setModalOpen}=useContext(context);
  const {selectImg,setSelectImg}=useContext(context);


  
  

  const getdata = async () => {
    const account = await getAccount();
    setAccount(account);
    let dataArray;
    const storage = await fetchStorage();
    const my_map = storage.user;
    

    if (my_map.hasOwnProperty(account)) {
      const my_list = my_map[account];
      dataArray = Object.keys(my_list);
      if(dataArray[0]){
          const str = dataArray.toString(); 
          const str_array = str.split(",");
          console.log(str_array);
          
          
          const images = str_array.map((item, i) => {
            return (
              // <a href={item} key={i} target="_blank">
                <a key={i}>
                <a href={item} key={i} target="_blank">

                <img
                  key={i}
                  src={`https://gateway.pinata.cloud/ipfs/${item.substring(34)}`}
                  alt="new"
                  className="image-list"

                ></img>
                </a>
                
<BiShareAlt style={{cursor:"pointer",display:"absolute",marginTop:"-583px",
                        color:"black",marginLeft:"131px",fontSize:"30px"}} onClick={()=>setContent(item)}/>
                <RxCrossCircled style={{cursor:"pointer",display:"absolute",marginTop:"-560px",
                        color:"red",marginLeft:"131px",fontSize:"30px"}} onClick={()=>deleteImage(item)}/>

{/* <RxCrossCircled style={{cursor:"pointer",display:"absolute",marginTop:"-115px",
                        color:"black",marginLeft:"130px",fontSize:"30px"}} onClick={()=>setContent(item)}/> */}
              </a>
            );
          });
          setData(images);
      }else{
        alert("No image to display");
      }
      
    }
     else {
      alert("No image to display");
    }
  };
  const getOtherData = async()  => {
    const account = await getAccount();
    setAccount(account);
    let dataArray;
    let d;
    const Otheraddress = document.querySelector(".address").value;
    console.log(Otheraddress);



    const storage = await fetchStorage();
    if (Otheraddress && Otheraddress!=account ) {
        const my_map = storage.access_user;
        if(my_map.hasOwnProperty(Otheraddress)){
          console.log("hii");
          const my_list = my_map[Otheraddress];
          if(my_list.hasOwnProperty(account)){
            console.log("hello");
            const my_imgs = my_list[account];
            const imgs = Object.keys(my_imgs);
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
              </a>
            );
          });
          setData(images);

            // if(my_imgs.hasOwnProperty(url)){
            //   const image = (()=>{return (
            //             <>
            //             <a href={url} target="_blank">
            //               <img
            //                 src={url}
            //                 alt="new"
            //                 className="image-list"
            //                 style={{display:"relative"}}
            //               ></img>
            //             </a>
            //             </>
            //           );});
            //           setData(image);


            // }

          }else{
            alert("You don't have access")
          }
        }else{
          alert("User is not registered");
        }
      }
      else{
        alert("Enter correct value");
      }

          
          // if(my_L[0]){
          //     dataArray = my_L;
          //     const str = dataArray.toString();
          //     const str_array = str.split(",");
          //     const images = str_array.map((item, i) => {
          //       return (
          //         <>
          //         <a href={item} key={i} target="_blank">
                   
          //           <img
          //             key={i}
          //             src={`https://gateway.pinata.cloud/ipfs/${item.substring(34)}`}
          //             alt="new"
          //             className="image-list"
          //             style={{display:"relative"}}
          //           ></img>
                    
          //         </a>
          //         </>
          //       );
          //     });
          //     setData(images);
          //   }else{
          //     alert("No image present at that address")
          //   }}
         

  };
  const hideOther = () => {
    const Otheraddress = document.querySelector(".address").value;
    if(Otheraddress && account){
      window.location.reload();
    }else{
      alert("No image to hide");
    }

  }

  const deleteImage = async (img) => {
    try{
      const contract = await tezos.wallet.at("KT1TWcZKqV1V2iTVrPW7Y1rivSsFZjk9TaS6");
      // setContract(contract)
      const op =await contract.methods.deleteImg(img).send();
      await op.confirmation(1);
      alert("Removed Successfully");
      window.location.reload();
     
    }
    catch(err){
      alert("Try Again");
      
    } 
    
}
const setContent = async (item) => {
  setModalOpen(true);
  setSelectImg(item);

}
  return (
    <>
      <button className="center button" onClick={getdata} >
        Get Files
      </button>
      <button className="center button" onClick={()=>{
        window.location.reload();
      }} style={{background:"red",marginLeft:"10px"}}>
       Hide Files
      </button>
      {loading ? null :

      <div style={{display:"flex",marginLeft:"27%",marginBottom:"30px",marginTop:"30px"}}>

      <hr className="divider" style={{marginRight:"5px",width:"30%", height:"4px"}} /> 
      <span style={{marginTop:"-22px",fontWeight:"bold"}}>OR</span> 
      <hr className="divider" style={{marginLeft:"5px",fontSize:"25px", height:"4px",width:"30%"}} />
      </div>}
        
      <input
        type="text"
        placeholder="Enter Friend's Addresses"
        className="address"
      ></input>
      {/* <input
        type="url"
        placeholder="Enter image url"
        className="url"
      ></input> */}
      <button  onClick={getOtherData} className="ynn">
        Get Friend Files
      </button>
      {/* <button   onClick={()=>hideOther()} className="ynn" style={{background:"red",marginLeft:"10px"}}>
        Hide Others Data
      </button> */}
      <div 
      style={{
        paddingTop: '75px'
      }}
      ></div>
       {loading ? null :
  
      <div style={{display:"flex",marginLeft:"2%",marginBottom:"30px",marginTop:"30px"}}>

      <hr className="divider" style={{marginRight:"5px",width:"40%", height:"4px"}} /> 
      <span style={{marginTop:"-22px",fontWeight:"bold",fontSize:"26px",marginLeft:"17px",marginRight:"17px",color:"blue",marginTop:"-27px"}}>Uploaded Images </span> 
      <hr className="divider" style={{marginLeft:"5px",fontSize:"25px", height:"4px",width:"40%"}} />
      </div>}
      
      {data || loading ? null : 
      <div>
        <div 
      style={{
        paddingTop: '30px'
      }}
      ></div>

      <p className="animated">Let's tap on get files</p>
    </div>
}
      <div className="image-list">{account ? data : null}</div>

    </>
  );
};
export default Display;