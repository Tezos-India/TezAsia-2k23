import NavbarComponent from './Navbar';
import CardComponent from './Cards';
import { useState,useEffect } from 'react';
import ModalComponent from './Modal';
import { getNFT } from '../utils/api';
import ModalEntryComponent from './ModalEntry';

 function LayoutComponent(){
  
    const [value, setValue]=useState(false)
    const [reset,setReset]=useState("")
    const [nftLink,setNftLink]=useState("")

    async function image(){
      const data=await getNFT()
      console.log(data+"lol")
      setNftLink(data)
    }
    useEffect(()=>{

      image()
    },[])

    
    
   const arr=["/thumb.png","/thumb.png","/thumb.png","/thumb.png","/thumb.png","/thumb.png"]
  return (
    <div>
      <ModalEntryComponent />
      <NavbarComponent />
      <div className='flex justify-center'>

      <ModalComponent modalButton={reset}
                      modalReset={setReset}
                      resetCards={setValue}
                      imgLink={setNftLink}/>
        </div>
        
        <div className='py-4 flex justify-center'>
      <div className='grid grid-rows-2 grid-cols-3 gap-4'>
      {
        arr.map((data,i)=>{
          let random=Math.floor(Math.random()*6)
          return(
          random==i?(
           <CardComponent key={i} disable={setValue}
          enable={value}
          reset={setReset} image={nftLink}
          result={true}/>
        ):(
           <CardComponent key={i} disable={setValue}
          enable={value}
          reset={setReset} image={data}
          result={false}/>
        ))
      })
      }
        </div>
      </div>
    </div>
  );
    }

export default LayoutComponent;

