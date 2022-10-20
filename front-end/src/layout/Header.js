// React + Hooks
import React from "react"
import { Link } from "react-router-dom"

// React Bootstrap Components
import Col from "react-bootstrap/Col"

/**
 * Defines the main header.
 */
function Header(props) {

  return (
    <Col className="d-flex flex-column align-items-center justify-content-center">
      <div>
        <Link className="links" to="/dashboard"><h1 className="menu-h1">The Canopy Lounge: Reservations</h1></Link>
      </div>
    </Col>
  )
}

export default Header
