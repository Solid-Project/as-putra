import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import '@/index.css' // <--- PASTIKAN BARIS INI ADA DI SINI!

const basename = import.meta.env.VITE_BASE_NAME || "/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
        <App />
    </BrowserRouter>
  </React.StrictMode>
);