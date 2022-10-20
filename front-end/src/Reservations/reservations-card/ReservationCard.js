import { Link } from 'react-router-dom'

import { Card, Button } from 'react-bootstrap'

export default function ReservationCard(...props) {


  return (
    <>
      <Card style={{ width: '18rem' }} className="bg-secondary text-white">
        <Card.Body>
          <Card.Title>Reservation Name</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary"><Link to="/reservations/:reservationId/edit">Edit</Link></Button>
        </Card.Body>
    </Card>
    </>
  )
}