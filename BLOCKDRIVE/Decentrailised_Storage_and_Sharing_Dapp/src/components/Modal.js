import { useContext, useEffect, useState } from "react";
import { fetchStorage } from "../utils/tzkt";
import "./Modal.css";
import { tezos } from "../utils/tezos";
import { getAccount } from "../utils/wallet";
 import {VscChromeClose} from "react-icons/vsc"
import { context } from "../App";



const Modal = ()=> {

  

  console.log("helooooooooooooooooooooooooo");
  let t;

 
  const [rm,setRm] = useState(null);
  const [img,setImg] = useState(null);
  const [loading,setLoading] = useState(false);
  const [ls,setLS] = useState(null);
  const {selectImg,setModalOpen}=useContext(context);
  const [list,setList] = useState(null);
  const remove= async (e)=>{
    const v = e.target.value;
    console.log(v);
    setRm(v)
    // getImg();
  }

  const rm_img=async(e)=>{
    const i=e.target.value;
    console.log(i);
    setImg(i);
  }

    

    // const getImg = async () => {
    //   if(rm){
    //     const img = ls[rm];
    //     const imgs = Object.keys(img);
    //     let select = document.querySelector("#selectImages");
    //     for(let i=0; i< imgs.length;i++){
    //       let opt = imgs[i];
    //       let e1 = document.createElement("option");
    //       e1.textContent = opt;
    //       e1.value = opt;
    //       select.appendChild(e1);

    //     }

  
    //     }

      // }
    

  const removeDevice = async () => {
    if(rm && rm != "people with access" && img && img != "Shared Images"){
      try{
        const contract = await tezos.wallet.at("KT1TWcZKqV1V2iTVrPW7Y1rivSsFZjk9TaS6");
        const op = await contract.methods.disallow(rm,img).send();
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
  const sharing = async () => {
      console.log(selectImg);
    
    
      const address = document.querySelector(".address").value;
      console.log(address);
      if(selectImg){
        if(address){
          try{
            const contract = await tezos.wallet.at("KT1TWcZKqV1V2iTVrPW7Y1rivSsFZjk9TaS6");
            // setContract(contract)
            const op =await contract.methods.allow(address,selectImg).send();
            setLoading(true);
            await op.confirmation(1);
            setLoading(false);
            alert("Successfully added");
            window.location.reload();
  
           
          }
          catch(err){
            alert(err);
           
          } 
  
        }else{
          alert("Enter wallet address");
        }

      }else{alert("Select image from gallery")}
      

    
  };
  // useEffect(() => {
  
    
    
  //   // (async () => {
  //   const accessList = async () => {
  //     console.log(rm);
  //     console.log(list);

      
  //     const account = await getAccount();
  //     const storage = await fetchStorage();
  //     const my_m = storage.access_user;
  //     if(!rm){
  //       if(my_m.hasOwnProperty(account)){
  //         const my_l = my_m[account];
  //         setLS(my_l);
          
  //         const l = Object.keys(my_l);
          
  //         let select = document.querySelector("#selectNumber");
  //         console.log(select);
  //         for (let i = 0; i < l.length; i++) {
  //           let opt = l[i];
  //           let e1 = document.createElement("option");
  //           e1.textContent = opt;
  //           e1.value = opt;
  //           select.appendChild(e1);
  //         }
  //       }

  //     }
      
  //     if(rm){

  //       const img = ls[rm];
  //       const imgs = Object.keys(img);
  //       setList(imgs);

  //       // let select = document.querySelector("#selectImages");
  //       // console.log(typeof(select));
  //       // // console.log(Object.get(select));
  //       // console.log(select.firstElementChild);
  //       // for(let i=0; i< imgs.length;i++){
  //       //   let opt = imgs[i]; 
  //       //   let e1 = document.createElement("option");
  //       //   e1.textContent = opt;
  //       //   e1.value = opt;
  //       //   select.append(e1);

  //       // }
  //     }
  //   };
  //   {accessList();}
  // // })();
  // },[rm] );
  return (
  
    <>
    <div 
      style={{
        paddingTop: '75px'
      }}
      ></div>

      <div className="modalBackground">
       <div className="modalContainer">

         <div className="img" >
          <VscChromeClose onClick={() => {
                setModalOpen(false);
              }} style={{marginLeft:"96%",fontSize:"25px",cursor:"pointer"}} /> 
          <img   src="https://media.istockphoto.com/id/1344021555/photo/blocks-with-locks-on-dark-blue-background-future-innovation-blockchain-technology-token-money.jpg?b=1&s=170667a&w=0&k=20&c=CgTveKWIUY7mVdbvRqdpx93afQ35MuLn5MGZIVEOYAU=" style={{paddingTop:"6px",height:"250px"}}
          />
         </div>

          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Wallet Address"

            ></input>
             <div 
      style={{
        paddingTop: '1px'
      }}
      ></div>
            <input
              type="url"
              className="url"
              placeholder="Select Image from Gallery"
              value={selectImg}
              disabled={true}

            ></input>
          </div>
        
         
         <div className="footer" style={{marginLeft:"4px"}}>
      
            <button  onClick={(e) => sharing()}>Share</button>
            </div>


         
{/*               
            <select id="selectNumber" className="" onChange={(e)=>remove(e) }>
              <option className="option" >wallet with access</option>
              </select>

              <div 
      style={{
        paddingTop: '2px'
      }}
      ></div>
              
              <select id="selectImages" className=""onChange={(e)=>rm_img(e)}>
                <option value="default">shared images</option>
                {list ? list.map((url)=>{return <option>{url}</option>}):"shared images"}

              {/* <option className="option" >shared images</option> */}
              {/* </select> */}
   
            
           {/* <div className="footer" style={{marginTop:"6px",marginLeft:"8px"}}>    
           <button onClick = {()=>removeDevice()}style={{background:"red"}}  >Remove Access</button></div> */} 
           {/* {loading? 
        <div className="ModalBackground">
        <div class="loader"></div>
      </div>
        : null} */}
          
           
       </div>
      </div>
      
    </>
  );
};
export default Modal;