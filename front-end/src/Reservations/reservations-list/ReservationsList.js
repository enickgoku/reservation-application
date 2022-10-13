import React, { useState, useEffect } from "react"

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

  return (
    <h1>Working</h1>
  )
}