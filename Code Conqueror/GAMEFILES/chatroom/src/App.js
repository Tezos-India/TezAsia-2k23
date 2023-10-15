import { useEffect, useState } from "react";
import { getDatabase, ref, push, set ,onChildAdded } from "firebase/database";


function App() {
  const [name,setname] = useState(null);
  const [chats,setChats] = useState([])
  const [msg,setMsg] = useState("");
  const db = getDatabase();
  const commentsRef = ref(db,'chats');

  
  const updateHeight=()=>{
    const el = document.getElementById('msgbox');
    if(el){
      el.scrollTop = el.scrollHeight;
    }
  }
  useEffect(()=>{
    onChildAdded(commentsRef, (data) => {
      setChats(chats=>[...chats,data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 50);
    });
  },[]);

  const sendChat = () => {
    const chatListRef = ref(db, "chats");
    const chatRef = push(chatListRef);
    set(chatRef, {
      name,
      message: msg,
    });
    setMsg("");
  };
  return (
    <div className="App">
      { name?
      <>
      <h1 className="text-3xl font-bold">User : {name} </h1>
      <div id="msgbox" className="chatContainer overflow-scroll h-[80vh] border border-black m-2 p-3">
        { chats.map((c,i) =>{
            return(
             <div key={i} className={`flex ${c.name == name ? 'flex-row-reverse' : ""}`}>
             <p className={`border-2 border-gray-700 mt-1 mb-1 p-2 ${c.name != name ? 'bg-yellow-200' :  'bg-green-500' }  rounded-md`}>
               <strong>{`${c.name} : `}</strong>
               <span>{c.message} </span>
             </p>
           </div>
        )})}
       
      </div>
      <div className="input fixed  w-full bottom-0 flex flex-row p-2 bg-red-300 border rounded-r-2xl">
          <input value={msg} onInput={e=>setMsg(e.target.value)} className="p-2 m-1 grow border-gray-300 border" type="text" placeholder="Enter Your meseg here" />
          <button onClick={e=> sendChat()} className="p-2 m-1 bg-green-500  rounded-md">Send</button>
      </div>
    </>:
    <>
        <h1 className="w-full border-b-2 border-black text-center text-3xl">Wellcome To ChatRoom</h1>
      <div className="flex justify-center items-center h-[40vh] md:h-[60vh]">
        <div className="flex flex-col bg-blue-400 justify-around p-3 h-[20vh] md:h-[30vh] w-[70vw] border border-black rounded-3xl">
            <h2 className="w-full font-bold text-center text-xl">User Name</h2>
            <input className="p-2" type="text" onBlur={e=>setname(e.target.value)}  placeholder="Enter Your Name "/>
            <button className="  bg-green-500 w-fit mx-auto p-2 rounded-md">Enter Chatroom</button>
        </div>

      </div>
    </>
    }
    </div>
  );
}

export default App;
