import React from "react"
import { useState } from "react"

import Menu from "./Menu"
import Header from "./Header"
import Routes from "./Routes"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { DateTime, Settings } from "luxon"

import "./Layout.css"

Settings.defaultZoneName = "America/Michigan"

 function Layout() {

  const currentUrlParams = new URLSearchParams(window.location.search)

  const [currentDate, setCurrentDate] = useState(DateTime.local().toISODate())
  const [currentTime, setCurrentTime] = useState(DateTime.local().toFormat("T"))
  const [dateSetting, setDateSetting] = useState(currentUrlParams.get("date") || currentDate)

  setInterval(() => {
    setCurrentDate(DateTime.local().toISODate())
    setCurrentTime(DateTime.local().toFormat("T"))
  }, 1000)

  /**
   * Adjust the `dateSetting` for displaying reservations.
   */
  const handleChangeDateSetting = (value) =>
    typeof value === "number"
      ? setDateSetting(incrementDate(value))
      : setDateSetting(currentDate)

  /**
   * Helper function for `handleChangeDateSetting`.
   */
  const incrementDate = (value) => 
    DateTime.fromISO(dateSetting).plus({ days: value }).toISODate()
 
  return (
    <Container fluid className="layout bg-secondary text-white">
      <Row className="bg-secondary text-white">
        <Col className="d-flex align-items-end bg-secondary text-white">
          <Menu />
          <Header
            currentDate={currentDate}
            currentTime={currentTime}
            dateSetting={dateSetting}
          />
        </Col>
      </Row>
      <Row className="bg-secondary text-white">
        <Col className="d-flex justify-content-center align-items-center bg-secondary text-white p-0">
          <Routes
            currentDate={currentDate}
            dateSetting={dateSetting}
            setDateSetting={setDateSetting}
            currentTime={currentTime}
            changeDate={handleChangeDateSetting}
          />
        </Col>
      </Row>
    </Container>
  )
  }
 
 export default Layout
