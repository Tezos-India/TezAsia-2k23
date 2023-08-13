import "../styles/globals.css";
import type { AppProps } from "next/app";


import { SocketProvider } from '@/contexts/SocketContext';
import { UserProvider } from '@/contexts/UserContext';
import { GamesProvider } from '@/contexts/GamesContext';
import { ChatProvider } from '@/contexts/ChatContext';



function MyApp({ Component, pageProps }: AppProps) {
  return(
    <UserProvider>
    <SocketProvider>
    <ChatProvider>
      <GamesProvider>
     <Component {...pageProps} />
     </GamesProvider>
        </ChatProvider>
      </SocketProvider>
    </UserProvider>
     );
}

export default MyApp;
