// React + Hooks
import React from "react"
import { Link } from "react-router-dom"

import { DateTime } from "luxon"

// React Bootstrap Components
import { Col } from "react-bootstrap"

/**
 * Defines the main header.
 */
function Header(props) {

  let {
    currentDate,
    dateSetting,
    currentTime,
  } = props

  const formalDate =
    currentDate === dateSetting
      ? DateTime.fromISO(dateSetting).toFormat("DDDD")
      : DateTime.fromISO(dateSetting).toFormat("DDDD")

  const formalTime = DateTime.fromISO(currentTime).toFormat("t")

  const style = dateSetting < currentDate ? "text-muted" : null

  return (
    <Col className="d-flex flex-row align-items-between justify-content-between">
      <Link className="links" to="/dashboard"><h1 className="menu-h1">The Canopy Lounge: Reservations</h1></Link>
      <div className="flex-col">
        <span style={{ fontSize: "2rem" }}>{formalTime}</span>
        <span className={style}>{formalDate}</span>
      </div>
    </Col>
  )
}

export default Header
