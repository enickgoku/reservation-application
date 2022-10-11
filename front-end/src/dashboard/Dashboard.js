import React, { useEffect, useState } from "react"
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom"
import { listReservations } from "../utils/api"

import Row from "react-bootstrap/Row"


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <Row className="d-flex flex-column align-items-center flex-md-row justify-content-md-center align-items-md-start w-100">
      <Switch>
        <Route exact={true} path={"/dashboard"}>
            {/* <TablesList {...props} />
            <ReservationsList {...props} /> */}
        </Route>
        <Route exact={true} path={"/reservations"}>
          <Redirect to={"/dashboard"} />
        </Route>
        <Route exact={true} path={"/reservations/new"}>
          {/* <CreateReservationForm {...props} /> */}
        </Route>
        <Route exact={true} path={"/reservations/:reservationId/edit"}>
          {/* <EditReservationForm {...props} /> */}
        </Route>
        <Route exact={true} path={"/reservations/:reservationId/seat"}>
          {/* <SeatReservationForm {...props} /> */}
        </Route>
        <Route exact={true} path={"/tables"}>
          {/* <Redirect to={"/dashboard"} /> */}
        </Route>
        <Route exact={true} path={"/tables/new"}>
          {/* <CreateTableForm /> */}
        </Route>
        <Route exact={true} path={"/tables/:tableId/edit"}>
          {/* <EditTableForm /> */}
        </Route>
      </Switch>
    </Row>
  )
}

export default Dashboard
