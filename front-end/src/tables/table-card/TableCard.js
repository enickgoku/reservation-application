import { Link } from 'react-router-dom'

import { Card, Button } from 'react-bootstrap'

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

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body className="text-dark">
          <Card.Title>Table Name: {table?.table_name}</Card.Title>
          <Card.Title>Capacity: {table?.capacity}</Card.Title>
          <Card.Title>Status: {showFreeStatus(table)}</Card.Title>
          <Button variant="primary"><Link className="text-white links" to={`/tables/${table.table_id}/edit`}>Edit</Link></Button>
        </Card.Body>
      </Card>
    </>
  )
}