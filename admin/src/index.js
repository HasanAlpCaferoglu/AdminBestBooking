import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppAdmin from "./AppAdmin";

import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";

function indexAdmin() {
  ReactDOM.render(
    <React.StrictMode>
      <AppAdmin />
    </React.StrictMode>,
    document.getElementById("root")
  );
  
}

indexAdmin();

export default indexAdmin;

