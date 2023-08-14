import React, { useState, useEffect, useRef } from 'react'
import { useSocket } from '@/contexts/SocketContext';
import { useUser } from '@/contexts/UserContext';
import { useChat } from '@/contexts/ChatContext';

export default function Messages({ gameId }) {
  const { messages, setMessages } = useChat();
  const [message, setMessage] = useState('');
  const socket = useSocket();
  const scrollRef = useRef();
  const audioRef = useRef();
  const { id } = useUser();

  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (data) => {
      if (data.sender !== id) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      addMessage(data);
    };

    socket.on('message', handleIncomingMessage);

    return () => {
      socket.off('message', handleIncomingMessage);
    };
  }, [socket, id]);

  function handleSubmit() {
    if (message.trim() === '') return;

    const data = { text: message, sender: id };
    socket.emit('message', data, gameId);
    addMessage(data);
    setMessage('');
  }

  function addMessage(data) {
    setMessages(prevMessages => [...prevMessages, data]);
  }

  useEffect(() => {
    localStorage.setItem('messages-' + gameId, JSON.stringify(messages));
    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }, [messages, gameId]);

  function handleKeyPress(e) {
    if (e.key === 'Enter' && message.trim() !== '') {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className='messages-container sidebar-item'>
      <audio src='/new-message.mp3' ref={audioRef}></audio>

      <h3 className='sidebar-item-name' style={{ margin: '1em', marginBottom: '.5em' }}>Chat</h3>
      <div className='messages'>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender === id ? 'message-me' : ''}`}>
            {message.text}
          </div>
        ))}
        <div ref={scrollRef} className='bottom-message'></div>
      </div>

      <div className='new-message'>
        <textarea
          style={{ backgroundColor: "#444" }}
          value={message}
          placeholder="Type... a Message"
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  );
}



// import React, { useState, useEffect, useRef } from 'react'

// import { useSocket } from '../contexts/SocketContext'
// import { useUser } from '../contexts/UserContext'


// export default function Messages({ gameId }) {
//   const [messages, setMessages] = useState(() => {
//     let m = sessionStorage.getItem('messages-' + gameId)
//     if(!m) return []
//     return JSON.parse(m)
//   })
//   const [message, setMessage] = useState('')
//   const socket = useSocket()
//   const scrollRef = useRef()
//   const audioRef = useRef()
//   const { id } = useUser()
  
//   useEffect(() => {
//     if(!socket) return
//     socket.on('message', (data) => {
//       if(data.sender !== id) {
//         audioRef.current.currentTime = 0
//         audioRef.current.play()
//       }
//       addMessage(data)
//     })
//     return () => socket.off('message')
//   }, [socket, messages])

//   function handleSubmit() {
//     let data = { text: message, sender: id }
//     socket.emit('message', data, gameId)
//     addMessage(data)
//     setMessage('')
//   }

//   function addMessage(data) {
//     setMessages(prev => [...prev, data])
//   }

//   useEffect(() => {
//     sessionStorage.setItem('messages-' + gameId, JSON.stringify(messages))
//     scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
//   }, [messages])

//   function handleKeyPress(e) {
//     if(e.key === 'Enter' && message !== '') {
//       e.preventDefault()
//       handleSubmit()
//     }
//   }

//   return (
//     <div className='messages-container sidebar-item'>
//       <audio src='/new-message.mp3' ref={audioRef}></audio>

//       <h3 className='sidebar-item-name' style={{margin: '1em', marginBottom: '.5em'}}>Chat</h3>
//       <div className='messages'>
//         {
//           messages.map((message, index) => {
//             return (
//               <div key={index} className={`message ${message.sender === id ? 'message-me' : ''}`}>{message.text}</div>
//             )
//           })
//         }
//         <div ref={scrollRef} className='bottom-message'></div>
//       </div>

//       <div className='new-message'>
//         <textarea style={{  backgroundColor: "#444" }}
//           value={message} 
//           placeholder="Type... a Message"
//           onChange={e => setMessage(e.target.value)}
//           onKeyDown={handleKeyPress}
//         />
//       </div>
//     </div>
//   )
// }