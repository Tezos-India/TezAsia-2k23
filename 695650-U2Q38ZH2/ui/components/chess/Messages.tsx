import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import { useUser } from '@/contexts/UserContext';
import { useChat } from '@/contexts/ChatContext';
import type { Message } from '@/contexts/ChatContext'; 
interface MessagesProps {
  gameId: string;
}

export default function Messages({ gameId }: MessagesProps) {
  const { messages, setMessages } = useChat();
  const [message, setMessage] = useState<string>('');
  const socket = useSocket();
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { id } = useUser();

  useEffect(() => {
    if (!socket) return;

    const handleIncomingMessage = (data: Message) => {
      if (data.sender !== id) {
        audioRef.current && (audioRef.current.currentTime = 0);
        audioRef.current && audioRef.current.play();
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

    const data: Message = { text: message, sender: id };
    if (socket) {
      socket.emit('message', data, gameId);
    }
    addMessage(data);
    setMessage('');
  }

  function addMessage(data: Message) {
    setMessages(prevMessages => [...prevMessages, data]);
  }

  useEffect(() => {
    localStorage.setItem('messages-' + gameId, JSON.stringify(messages));
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  }, [messages, gameId]);

  function handleKeyPress(e: KeyboardEvent<HTMLTextAreaElement>) {
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
