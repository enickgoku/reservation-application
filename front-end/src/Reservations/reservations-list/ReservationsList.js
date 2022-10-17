import React, { useState, useEffect } from "react"

import ReservationCard from "../reservations-card/ReservationCard"

import { listReservations } from "../../utils/api"

export default function ReservationsList({ reservations, date }) {

  const [reservationsList, setReservationsList] = useState([])
  const [reservationsError, setReservationsError] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    listReservations({ date }, abortController.signal)
      .then(setReservationsList)
      .catch(setReservationsError)
    return () => abortController.abort()
  }, [date])

  if (!reservationsList) {
    return null
  }

  return (
    <>
      {reservationsList.map((reservation) => (
        <ReservationCard
          key={reservation.reservation_id}
          reservation={reservation}
        />
      ))}
    </>
  )
}