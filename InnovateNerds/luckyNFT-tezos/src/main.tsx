import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>

  <NextUIProvider>
  <div className="w-screen h-screen dark text-foreground bg-background px-8 items-start justify-center">
        <App />
      </div>  
  </NextUIProvider>
  </React.StrictMode>
);
