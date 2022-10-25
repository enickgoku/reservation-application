// React + Hooks
import React from "react";

// React Bootstrap Components
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";

import "./Layout.css";

/**
 * Defines the menu for this application.
 * @returns {JSX.Element}
 */
function Menu() {

  const globalMenuOptions = [
    {
      name: "Dashboard",
      url: "/dashboard",
    },
    {
      name: "New Reservation",
      url: "/reservations/new",
    },
    {
      name: "New Table",
      url: "/tables/new",
    }
]

  /**
   * Defines the menu that displays on all pages.
   */
  const globalPageOptions = globalMenuOptions.map((item, index) => (
    <Dropdown.Item key={index} href={item.url}>
      {item.name}
    </Dropdown.Item>
  ))

  return (
    <>
      <Row>
        <Col className="d-flex align-items-center justify-content-between flex-lg-row">
          <Dropdown className="mt-10 d-flex justify-content-start">
            <Dropdown.Toggle
              className="btn btn-secondary dropdown-toggle mt-2 mb-2"
              variant="dark"
              style={{ fontSize: "1.5rem" }}
            >
            <svg xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-list align-items-center justify-content-center mb-1"
              viewBox="0 0 16 16"
            >
              <path
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {globalPageOptions}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </>
  )
}

export default Menu