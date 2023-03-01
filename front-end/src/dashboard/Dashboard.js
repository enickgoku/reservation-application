import React, { useEffect, useState } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { useMediaQuery } from "react-responsive"

import FormTables from "../form-tables/FormTables"
import FormReservation from "../form-reservations/FormReservations"
import ReservationsList from "../reservations/reservations-list/ReservationsList"
import Row from "react-bootstrap/Row"
import Loading from "../loading/Loading"
import SeatTable from "../reservations/seat-table/SeatTable"
import TableList from "../tables/table-list/TableList"

import { useTables, useReservations } from "../hooks"

import "../layout/Layout.css"

function Dashboard(props) {

  const { fetchReservations, reservations } = useReservations()
  const { fetchTables, tables } = useTables()

  let {
    setDateSetting,
    currentDate, // 2022-10-24
    dateSetting, // adjustable date state
  } = props

  const [reservationsFilter, setReservationsFilter] = useState("all")
  const [tablesError, setTablesError] = useState(null)
  const [reservationsError, setReservationsError] = useState(null)
  const [tablesFilter, setTablesFilter] = useState("all")

  const loadDashboard = () => {
    const abortController = new AbortController()

    let tablesParams = { status: tablesFilter }
    let resoParams = { date: dateSetting, phase: reservationsFilter }

    if (tablesFilter !== 'all'){
    tablesParams = tablesFilter
    }

    fetchTables(tablesParams, abortController.signal)
    fetchReservations(resoParams, abortController.signal)

    return () => abortController.abort()
  }

  useEffect(loadDashboard, [dateSetting, reservationsFilter, tablesFilter, currentDate, fetchReservations, fetchTables])

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1000px)'
  })

  if(!reservations || !tables) return <Loading />

  return (
    <Row className="d-flex flex-column align-items-center flex-md-row justify-content-md-center align-items-md-start w-100">
      <Switch>
        <Route exact path={["/reservations", "/tables", "/dashboard"]}>
          {isDesktopOrLaptop && (
            <>
              <div className="col-md-4">
                <ReservationsList
                  loadDashboard={loadDashboard}
                  dateSetting={dateSetting}
                  currentDate={currentDate}
                  reservations={reservations}
                  setReservationsFilter={setReservationsFilter}
                  setDateSetting={setDateSetting}
                  reservationsFilter={reservationsFilter}
                />
              </div>
              <div className="col-md-8">
                <TableList
                  tables={tables}
                  tablesError={tablesError}
                  setTablesFilter={setTablesFilter}
                  loadDashboard={loadDashboard}
                />
              </div>
            </>
          )}
          {!isDesktopOrLaptop && (
            <>
              <div className="col-12">
                <ReservationsList
                  loadDashboard={loadDashboard}
                  dateSetting={dateSetting}
                  currentDate={currentDate}
                  reservations={reservations}
                  setReservationsFilter={setReservationsFilter}
                  setDateSetting={setDateSetting}
                  reservationsFilter={reservationsFilter}
                />
              </div>
              <div className="col-12">
                <TableList
                  tables={tables}
                  tablesError={tablesError}
                  setTablesFilter={setTablesFilter}
                  loadDashboard={loadDashboard}
                />
              </div>
            </>
          )}
        </Route>
        <Route exact path="/reservations/new">
          <FormReservation
            loadDashboard={loadDashboard}
            dateSetting={dateSetting}
            setDateSetting={setDateSetting}
          />
        </Route>
        <Route exact path="/reservations/:reservation_id/edit">
          <FormReservation
            reservations={reservations}
            currentDate={currentDate}
            loadDashboard={loadDashboard}
            dateSetting={dateSetting}
            setDateSetting={setDateSetting}
            reservationsFilter={reservationsFilter}
          />
        </Route>
        <Route exact path="/reservations/:reservation_id/seat">
          <SeatTable {...props} loadDashboard={loadDashboard} />
        </Route>
        <Route exact path="/tables">
          <Redirect to="/dashboard" />
        </Route>
        <Route exact path="/tables/new">
          <FormTables
            dateSetting={dateSetting}
            setDateSetting={setDateSetting}
            loadDashboard={loadDashboard}
          />
        </Route>
        <Route exact path="/tables/:table_id/edit">
          <FormTables
            dateSetting={dateSetting}
            setDateSetting={setDateSetting}
            loadDashboard={loadDashboard}
          />
        </Route>
      </Switch>
    </Row>
  )
}

export default Dashboard
