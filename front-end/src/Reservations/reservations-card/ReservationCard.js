import React from "react"

import { DateTime } from 'luxon'

import ResercationCardSeatOptions from './ReservationCardSeatOption'
import Loading from '../../loading/Loading'
import { Card } from 'react-bootstrap'

export default function ReservationCard(props) {

  let {
    reservations,
  } = props

  if (!reservations) {
    return <Loading />
  }

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
