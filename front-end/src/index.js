import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ReservationsProvider } from "./hooks/useReservations";

import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ReservationsProvider>
        <App />
      </ReservationsProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
