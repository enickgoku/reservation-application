import React from "react"

import TableCardOptions from "./TableCardOptions"

import { Card } from 'react-bootstrap'

export default function TableCard(props) {

  let {
    table,
    loadDashboard,
  } = props

  const status = table.reservation_id ? "Occupied" : "Free"

  const border = table?.reservation_id ? "border border-danger border-5" : ""

  return (
    <>
      <Card style={{ width: '18rem' }} className={`${border}`}>
        <Card.Body className="text-dark">
          <Card.Title>Table Name: {table?.table_name}</Card.Title>
          <Card.Title>Capacity: {table?.capacity}</Card.Title>
          <Card.Text data-table-id-status={table.table_id}>Status: {status}</Card.Text>
          <TableCardOptions table={table} loadDashboard={loadDashboard} />
        </Card.Body>
      </Card>
    </>
  )
}
