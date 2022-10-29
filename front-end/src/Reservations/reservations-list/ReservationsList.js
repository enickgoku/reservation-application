import React, { useState, useEffect } from "react"

import ReservationCard from "../reservations-card/ReservationCard"
import Loading from "../../loading/Loading"
import ErrorAlert from "../../layout/ErrorAlert"
import ReservationToolBar from "../reservations-options-bar/ReservationToolBar"

export default function ReservationsList(props) {

  let { reservations, date, dateSetting, currentDate, setReservationsFilter, setDateSetting } = props

  const [reservationsList, setReservationsList] = useState([])
  const [reservationsError, setReservationsError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setReservationsError(null)
    setReservationsList(reservations)
    setLoading(false)
  }, [reservations])

  if (loading || reservationsError) {
    return <Loading />
  }

  return (
    <>
      <ReservationToolBar currentDate={currentDate} dateSetting={dateSetting} setDateSetting={setDateSetting} setReservationsFilter={setReservationsFilter} />
      <ErrorAlert error={reservationsError} />
      {reservationsList.map((reservation) => (
          <ReservationCard
            key={reservation.reservation_id}
            reservations={reservation}
            date={date}
          />
      ))}
    </>
  )
}
