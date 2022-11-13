import React, { useState, useEffect } from "react"

import ReservationCard from "../reservations-card/ReservationCard"
import Loading from "../../loading/Loading"
import ErrorAlert from "../../layout/ErrorAlert"
import ReservationToolBar from "../reservations-options-bar/ReservationToolBar"

export default function ReservationsList(props) {

  let { reservations, dateSetting, currentDate, setReservationsFilter, setDateSetting, loadDashboard } = props

  const [reservationsList, setReservationsList] = useState([])
  const [reservationsError, setReservationsError] = useState(null)
  const [loading, setLoading] = useState(true)

  console.log(reservationsList)

  useEffect(() => {
    setReservationsError(null)
    setReservationsList(reservations)
    setLoading(false)
  }, [reservations, dateSetting])

  if (loading || reservationsError) {
    return <Loading />
  }
  
  console.log(reservationsList)

  return (
    <>
      <ReservationToolBar currentDate={currentDate} dateSetting={dateSetting} setDateSetting={setDateSetting} setReservationsFilter={setReservationsFilter} loadDashboard={loadDashboard} />
      <ErrorAlert error={reservationsError} />
      {reservationsList.map((reservation) => (
          <ReservationCard
            key={reservation.reservation_id}
            reservations={reservation}
            loadDashboard={loadDashboard}
          />
      ))}
    </>
  )
}
