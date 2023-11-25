import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AutProvider } from "./context/useContex";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AutProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AutProvider>
  </React.StrictMode>
);
