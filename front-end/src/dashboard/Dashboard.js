import React, { useEffect, useState } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { listReservations, listTables } from "../utils/api"

// import CreateReservationForm from "../reservations/forms/CreateReservationForm"
// import EditReservationsForm from "../reservations/forms/EditReservationsForm"
import FormReservations from "../form-reservations/FormReservations"
import ReservationsList from "../reservations/reservations-list/ReservationsList"
import CreateTableForm from "../tables/forms/CreateTableForm"
import Row from "react-bootstrap/Row"
import Loading from "../loading/Loading"
import SeatTable from "../reservations/seat-table/SeatTable"
import TableList from "../tables/table-list/TableList"
import EditTableForm from "../tables/forms/EditTableForm"

import "../layout/Layout.css"

function Dashboard(props) {

  let {
    setDateSetting,
    currentDate, // 2022-10-24
    dateSetting, // 2022-10-24
  } = props

  const [reservations, setReservations] = useState([])
  const [reservationsError, setReservationsError] = useState(null)
  const [reservationsFilter, setReservationsFilter] = useState("all")
  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null)
  const [tablesFilter, setTablesFilter] = useState("all")

  useEffect(loadDashboard, [dateSetting, reservationsFilter, tablesFilter])

  function loadDashboard() {
    const abortController = new AbortController()
    setReservationsError(null)
    listReservations({ date: dateSetting, phase: reservationsFilter }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError)
    listTables({ date: dateSetting, status: tablesFilter }, abortController.signal)
      .then(setTables)
      .catch(setTablesError)
    return () => abortController.abort()
  }

  if(!reservations || !tables) return <Loading />

  return (
    <Row className="d-flex flex-column align-items-center flex-md-row justify-content-md-center align-items-md-start w-100">
      <Switch>
        <Route exact={true} path={"/dashboard"}>
          <TableList tables={tables} tablesError={tablesError} setTablesFilter={setTablesFilter} loadDashboard={loadDashboard} />
          <ReservationsList loadDashboard={loadDashboard} dateSetting={dateSetting} currentDate={currentDate} reservations={reservations} reservationsError={reservationsError} setReservationsFilter={setReservationsFilter} setDateSetting={setDateSetting} reservationsFilter={reservationsFilter} />
        </Route>
        <Route exact={true} path={"/reservations/new"}>
          <FormReservations loadDashboard={loadDashboard} />
        </Route>
        <Route exact={true} path={"/reservations/:reservation_id/edit"}>
          <FormReservations setReservations={setReservations} reservations={reservations} currentDate={currentDate} loadDashboard={loadDashboard} />
        </Route>
        <Route exact={true} path={"/reservations/:reservation_id/seat"}>
          <SeatTable {...props} />
        </Route>
        <Route exact={true} path={"/tables"}>
          <Redirect to={"/dashboard"} />
        </Route>
        <Route exact={true} path={"/tables/new"}>
          <CreateTableForm setTables={setTables} />
        </Route>
        <Route exact={true} path={"/tables/:table_id/edit"}>
          <EditTableForm setTables={setTables} />
        </Route>
      </Switch>
    </Row>
  )
}

export default Dashboard
