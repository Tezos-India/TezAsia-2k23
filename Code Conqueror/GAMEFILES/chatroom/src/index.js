import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


// Fire Base
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyA1RQmLG-k6Tjxhmg8iadkrpyKlcY85MIc",
  authDomain: "bluff-chatroom.firebaseapp.com",
  databaseURL: "https://bluff-chatroom-default-rtdb.firebaseio.com",
  projectId: "bluff-chatroom",
  storageBucket: "bluff-chatroom.appspot.com",
  messagingSenderId: "986348141807",
  appId: "1:986348141807:web:3c07146ef662b39ce7af1a",
};
const app = initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
