import React, { useEffect, useState } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { listReservations, listTables } from "../utils/api"

import FormTables from "../form-tables/FormTables"
import FormReservation from "../form-reservations/FormReservations"
import ReservationsList from "../reservations/reservations-list/ReservationsList"
import Row from "react-bootstrap/Row"
import Loading from "../loading/Loading"
import SeatTable from "../reservations/seat-table/SeatTable"
import TableList from "../tables/table-list/TableList"

import "../layout/Layout.css"

function Dashboard(props) {

  let {
    setDateSetting,
    currentDate, // 2022-10-24
    dateSetting, // adjustable date state
  } = props

  const [reservations, setReservations] = useState([])
  const [reservationsError, setReservationsError] = useState(null)
  const [reservationsFilter, setReservationsFilter] = useState("all")
  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null)
  const [tablesFilter, setTablesFilter] = useState("all")

  useEffect(loadDashboard, [dateSetting, reservationsFilter, tablesFilter, currentDate])

  function loadDashboard() {
    const abortController = new AbortController()

    const params = {}

    if (tablesFilter !== 'all'){
    params.status = tablesFilter
    }
    
    setReservationsError(null)
    listTables(params, abortController.signal)
      .then(setTables)
      .catch(setTablesError)
    listReservations({ date: dateSetting, phase: reservationsFilter }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError)
    return () => abortController.abort()
  }

  if(!reservations || !tables) return <Loading />

  return (
    <Row className="d-flex flex-column align-items-center flex-md-row justify-content-md-center align-items-md-start w-100">
      <Switch>
        <Route exact={true} path={["/reservations", "/tables", "/dashboard"]}>
          <TableList tables={tables} tablesError={tablesError} setTablesFilter={setTablesFilter} loadDashboard={loadDashboard} />
          <ReservationsList loadDashboard={loadDashboard} dateSetting={dateSetting} currentDate={currentDate} reservations={reservations} reservationsError={reservationsError} setReservationsFilter={setReservationsFilter} setDateSetting={setDateSetting} reservationsFilter={reservationsFilter} />
        </Route>
        <Route exact={true} path={"/reservations/new"}>
          <FormReservation loadDashboard={loadDashboard} dateSetting={dateSetting} setDateSetting={setDateSetting} />
        </Route>
        <Route exact={true} path={"/reservations/:reservation_id/edit"}>
          <FormReservation setReservations={setReservations} reservations={reservations} currentDate={currentDate} loadDashboard={loadDashboard} dateSetting={dateSetting} setDateSetting={setDateSetting} reservationsFilter={reservationsFilter} />
        </Route>
        <Route exact={true} path={"/reservations/:reservation_id/seat"}>
          <SeatTable {...props} loadDashboard={loadDashboard} />
        </Route>
        <Route exact={true} path={"/tables"}>
          <Redirect to={"/dashboard"} />
        </Route>
        <Route exact={true} path={"/tables/new"}>
          <FormTables setTables={setTables} dateSetting={dateSetting} setDateSetting={setDateSetting} loadDashboard={loadDashboard} />
        </Route>
        <Route exact={true} path={"/tables/:table_id/edit"}>
          <FormTables setTables={setTables} dateSetting={dateSetting} setDateSetting={setDateSetting} />
        </Route>
      </Switch>
    </Row>
  )
}

export default Dashboard
