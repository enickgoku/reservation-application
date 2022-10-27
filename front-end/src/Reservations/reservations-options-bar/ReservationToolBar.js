import React from "react"

import { DateTime } from 'luxon'

import { useHistory } from "react-router"
import { Button, Dropdown } from 'react-bootstrap'

export default function ReservationToolBar(props) {

  let {
    currentDate,
    dateSetting,
  } = props
  
  const history = useHistory()

  return (
    <div>
      <Button ><i className="ri-arrow-left-s-line" /></Button>
      <Button ><i className="ri-home-line" /></Button>
      <Button ><i className="ri-arrow-right-s-line" /></Button>
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
              
          </Dropdown.Menu>
        </Dropdown>
    </div>
  )
}