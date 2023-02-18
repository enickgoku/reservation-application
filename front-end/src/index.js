import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ReservationsProvider } from "./hooks/useReservations";
import { TablesProvider } from "./hooks/useTables";

import "./index.css"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ReservationsProvider>
        <TablesProvider>
          <App />
        </TablesProvider>
      </ReservationsProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
