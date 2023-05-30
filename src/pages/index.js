import { useEffect } from 'react';
import io from 'socket.io-client';
import ChatApp from 'src/components/layout/ChatApp';

// import { Inter } from 'next/font/google';
import styles from 'styles/Home.module.css';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
   let webSocket;

   const socketInitializer = async () => {
      await fetch('/api/socket');
      webSocket = io();
   };

   useEffect(() => {
      socketInitializer();
   }, []);

   return (
      <>
         <main className={`${styles.main}`}>
            <ChatApp />
         </main>
      </>
   );
}
