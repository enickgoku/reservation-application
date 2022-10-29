import React from 'react'

import { Dropdown } from 'react-bootstrap'

export default function TableFilter(props){

  let {
    setTablesFilter,
  } = props

  return (
    <div>
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
            <Dropdown.Item onClick={() => setTablesFilter("all")}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => setTablesFilter("free")}>Free</Dropdown.Item>
            <Dropdown.Item onClick={() => setTablesFilter("occupied")}>Occupied</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    </div>
  )
}
