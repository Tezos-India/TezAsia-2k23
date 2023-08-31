// contexts/ChatContext.tsx
import React, { createContext, useContext, useState } from 'react';

export type Message = {
  text: string;
  sender: string | null;// Ensure sender is only of type 'string'
};

const ChatContext = createContext<{
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}>({
  messages: [],
  setMessages: () => {},
});

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <ChatContext.Provider value={{ messages, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
