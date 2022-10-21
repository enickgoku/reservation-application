import React, { useEffect, useState } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { listReservations } from "../utils/api"

import CreateReservationForm from "../reservations/forms/CreateReservationForm"
import EditReservationForm from "../reservations/forms/EditReservationsForm"
import ReservationsList from "../reservations/reservations-list/ReservationsList"
import CreateTableForm from "../tables/forms/CreateTableForm"
import Row from "react-bootstrap/Row"
import Loading from "../loading/Loading"

import "../layout/Layout.css"

function Dashboard(props) {

  let {
    dateSetting
  } = props

  const [reservations, setReservations] = useState([])
  const [reservationsError, setReservationsError] = useState(null)
  // const [tables, setTables] = useState([])

  useEffect(loadDashboard, [dateSetting])

  function loadDashboard() {
    const abortController = new AbortController()
    setReservationsError(null)
    listReservations({ date: dateSetting }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError)
    //list tables here
    return () => abortController.abort()
  }

  //reservations are getting loaded.

  if(!reservations){
    return <Loading />
  }

  return (
    <Row className="d-flex flex-column align-items-center flex-md-row justify-content-md-center align-items-md-start w-100">
      <Switch>
        <Route exact={true} path={"/dashboard"}>
            {/* <TablesList {...props} /> */}
            <ReservationsList reservations={reservations} reservationsError={reservationsError} />
        </Route>
        <Route exact={true} path={"/reservations/new"}>
          <CreateReservationForm />
        </Route>
        <Route exact={true} path={"/reservations/:reservationId/edit"}>
          <EditReservationForm />
        </Route>
        <Route exact={true} path={"/reservations/:reservationId/seat"}>
          {/* <SeatReservationForm {...props} /> */}
        </Route>
        <Route exact={true} path={"/tables"}>
          <Redirect to={"/dashboard"} />
        </Route>
        <Route exact={true} path={"/tables/new"}>
          <CreateTableForm />
        </Route>
        <Route exact={true} path={"/tables/:tableId/edit"}>
          {/* <EditTableForm /> */}
        </Route>
      </Switch>
    </Row>
  )
}

export default Dashboard
