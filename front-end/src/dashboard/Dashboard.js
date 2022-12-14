import React, { useEffect, useState } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { listTables } from "../utils/api"

import FormTables from "../form-tables/FormTables"
import FormReservation from "../form-reservations/FormReservations"
import ReservationsList from "../reservations/reservations-list/ReservationsList"
import Row from "react-bootstrap/Row"
import Loading from "../loading/Loading"
import SeatTable from "../reservations/seat-table/SeatTable"
import TableList from "../tables/table-list/TableList"

import { useReservations } from "../hooks/useReservations"

import "../layout/Layout.css"

function Dashboard(props) {

  const { fetchReservations, reservations } = useReservations()

  let {
    setDateSetting,
    currentDate, // 2022-10-24
    dateSetting, // adjustable date state
  } = props

  const [reservationsFilter, setReservationsFilter] = useState("all")
  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null)
  const [tablesFilter, setTablesFilter] = useState("all")

  useEffect(loadDashboard, [dateSetting, reservationsFilter, tablesFilter, currentDate, fetchReservations])

  function loadDashboard() {
    const abortController = new AbortController()

    const params = {}
    const resoParams = { date: dateSetting, phase: reservationsFilter }

    if (tablesFilter !== 'all'){
    params.status = tablesFilter
    }
    listTables(params, abortController.signal)
      .then(setTables)
      .catch(setTablesError)
    fetchReservations(resoParams, abortController.signal)
    return () => abortController.abort()
  }

  if(!reservations || !tables) return <Loading />

  return (
    <Row className="d-flex flex-column align-items-center flex-md-row justify-content-md-center align-items-md-start w-100">
      <Switch>
        <Route exact={true} path={["/reservations", "/tables", "/dashboard"]}>
          <TableList tables={tables} tablesError={tablesError} setTablesFilter={setTablesFilter} loadDashboard={loadDashboard} />
          <ReservationsList loadDashboard={loadDashboard} dateSetting={dateSetting} currentDate={currentDate} reservations={reservations} setReservationsFilter={setReservationsFilter} setDateSetting={setDateSetting} reservationsFilter={reservationsFilter} />
        </Route>
        <Route exact={true} path={"/reservations/new"}>
          <FormReservation loadDashboard={loadDashboard} dateSetting={dateSetting} setDateSetting={setDateSetting} />
        </Route>
        <Route exact={true} path={"/reservations/:reservation_id/edit"}>
          <FormReservation reservations={reservations} currentDate={currentDate} loadDashboard={loadDashboard} dateSetting={dateSetting} setDateSetting={setDateSetting} reservationsFilter={reservationsFilter} />
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
          <FormTables setTables={setTables} dateSetting={dateSetting} setDateSetting={setDateSetting} loadDashboard={loadDashboard} />
        </Route>
      </Switch>
    </Row>
  )
}

export default Dashboard
