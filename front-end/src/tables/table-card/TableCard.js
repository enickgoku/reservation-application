import { Link } from 'react-router-dom'

import { Card, Button } from 'react-bootstrap'

export default function TableCard(props) {

  let {
    tables
  } = props

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Table Name: {tables?.table_name}</Card.Title>
          <Card.Title>Capacity: {tables?.capacity}</Card.Title>
          <Card.Title>Status: </Card.Title>
          <Button variant="primary text-white"><Link to="/tables/:tableId/edit">Edit</Link></Button>
        </Card.Body>
      </Card>
    </>
  )
}