import { Link } from 'react-router-dom'

import { DateTime } from 'luxon'

import ResercationCardSeatOptions from './ReservationCardSeatOption'
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

  // format the date and time for display in the card
  const formattedDate = DateTime.fromISO(reservations.reservation_date).toFormat('DDD')
  const formattedTime = DateTime.fromISO(reservations.reservation_time).toFormat('t')

  return (
    <>
      <Card style={{ width: '18rem' }} className="bg-secondary text-white">
        <Card.Body>
          <Card.Title>{reservations.first_name}</Card.Title>
          <Card.Title>{reservations.last_name}</Card.Title>
          <Card.Text>
            Set for {formattedDate} at {formattedTime}
          </Card.Text>
          {/* <Button variant="primary"><Link className="links text-white" to={`/reservations/${reservations.reservation_id}/edit`}>Edit</Link></Button> */}
          <Card.Footer className="d-flex justify-content-center p-0">
            <ResercationCardSeatOptions
              {...props}
            />
          </Card.Footer>
        </Card.Body>
      </Card>
    </>
  )
}