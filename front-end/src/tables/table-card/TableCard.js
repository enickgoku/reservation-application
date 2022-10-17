import { Link } from 'react-router-dom'

import { Card, Button } from 'react-bootstrap/Card'

export default function TableCard(...props) {


  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Table Name: </Card.Title>
          <Card.Title>Capacity: </Card.Title>
          <Card.Title>Status: </Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary"><Link to="/tables/:tableId/edit">Edit</Link></Button>
        </Card.Body>
    </Card>
    </>
  )
}