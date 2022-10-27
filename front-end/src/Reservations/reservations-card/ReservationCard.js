import { Link } from 'react-router-dom'

import Loading from '../../loading/Loading'
import { Card, Button } from 'react-bootstrap'

export default function ReservationCard(props) {

  let {
    currentDate,
    reservations,
  } = props

  if (!reservations) {
    return <Loading />
  }

  return (
    <>
      <Card style={{ width: '18rem' }} className="bg-secondary text-white">
        <Card.Body>
          <Card.Title>{reservations.first_name}</Card.Title>
          <Card.Title>{reservations.last_name}</Card.Title>
          <Card.Text>
            Set for {reservations.reservation_date} at {reservations.reservation_time}
          </Card.Text>
          <Button variant="primary"><Link className="links text-white" to={`/reservations/${reservations.reservation_id}/edit`}>Edit</Link></Button>
        </Card.Body>
      </Card>
    </>
  )
}