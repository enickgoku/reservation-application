import React from "react"
import { useHistory } from "react-router-dom"

import { DateTime } from "luxon"

import { Button, Dropdown } from 'react-bootstrap'

export default function ReservationToolBar(props) {

  const history = useHistory()

  let { setDateSetting, setReservationsFilter, dateSetting, loadDashboard, currentDate } = props

  const addOneDay = () => {
    setDateSetting(DateTime.fromISO(dateSetting).plus({ days: 1 }).toISODate())
    history.push(`/dashboard?date=${dateSetting}`)
  }

  const subtractOneDay = () => {
    setDateSetting(DateTime.fromISO(dateSetting).minus({ days: 1 }).toISODate())
    history.push(`/dashboard?date=${dateSetting}`)
  }

  const setToday = () => {
    setDateSetting(currentDate)
    history.push(`/dashboard?date=${currentDate}`)
  }

  return (
    <div>
      <Button onClick={() => subtractOneDay()}><i className="ri-arrow-left-s-line" /></Button>
      <Button onClick={() => setToday()}><i className="ri-home-line" /></Button>
      <Button onClick={() => addOneDay()}><i className="ri-arrow-right-s-line" /></Button>
      <Dropdown className="mt-10 d-flex justify-content-start">
        <Dropdown.Toggle
          className="btn btn-secondary dropdown-toggle mt-2 mb-2"
          variant="dark"
          style={{ fontSize: "1.5rem" }}
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        </svg>
        </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item className="text-muted">Filter</Dropdown.Item>
            <Dropdown.Item onClick={() => setReservationsFilter("all")}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => setReservationsFilter("booked")}>Booked</Dropdown.Item>
            <Dropdown.Item onClick={() => setReservationsFilter("seated")}>Seated</Dropdown.Item>
            <Dropdown.Divider></Dropdown.Divider>
            <Dropdown.Header>History</Dropdown.Header>
            <Dropdown.Item onClick={() => setReservationsFilter("finished")}>
                Finished
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setReservationsFilter("cancelled")}>
                Cancelled
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    </div>
  )
}
