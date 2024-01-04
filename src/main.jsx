import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import SuperProvider from "./components/SuperProvider";
import { BrowserRouter } from "react-router-dom";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./assets/index.css";
import "./assets/global.css";
import "./assets/media-queries.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SuperProvider>
        <App />
      </SuperProvider>
    </BrowserRouter>
  </React.StrictMode>
);
