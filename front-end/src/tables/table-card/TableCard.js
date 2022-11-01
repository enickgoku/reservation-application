import React from "react"

import TableCardOptions from "./TableCardOptions"

import { Card } from 'react-bootstrap'

export default function TableCard(props) {

  let {
    table
  } = props

  const showFreeStatus = (table) => {
    if (table.reservation_id == null) {
      return "Free"
    } else {
      return "Occupied"
    }
  }

  const border = table?.reservation_id ? "border border-danger border-5" : ""

  return (
    <>
      <Card style={{ width: '18rem' }} className={`${border}`}>
        <Card.Body className="text-dark">
          <Card.Title>Table Name: {table?.table_name}</Card.Title>
          <Card.Title>Capacity: {table?.capacity}</Card.Title>
          <Card.Title>Status: {showFreeStatus(table)}</Card.Title>
          <TableCardOptions table={table} />
        </Card.Body>
      </Card>
    </>
  )
}
