"use client";
import MintOnIPFS from "./components/MintOnIPFS.js";
import Navbar from "./components/Navbar.js";

function App() {
  if (typeof window !== "undefined") {
    return (
      <>
        <Navbar />
        <MintOnIPFS />
      </>
    );
  }
}

export default App;
