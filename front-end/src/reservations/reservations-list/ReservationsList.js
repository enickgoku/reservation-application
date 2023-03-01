import React, { useState, useEffect } from "react"

import ReservationCard from "../reservations-card/ReservationCard"
import Loading from "../../loading/Loading"
import ErrorAlert from "../../layout/ErrorAlert"
import ReservationToolBar from "../reservations-options-bar/ReservationToolBar"

export default function ReservationsList(props) {

  let { reservations, dateSetting, currentDate, setReservationsFilter, setDateSetting, loadDashboard, tables } = props

  const [reservationsError, setReservationsError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(window.innerWidth >= 768)

  useEffect(() => {
    setReservationsError(null)
    setLoading(false)

    const handleResize = () => {
      setIsDesktopOrLaptop(window.innerWidth >= 768)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [reservations, dateSetting])

  if (loading || reservationsError) {
    return <Loading />
  }

  return (
    <div className={isDesktopOrLaptop ? "d-flex flex-column align-items-start flex-shrink-0 mr-5 h-50 overflow-auto" : ""}>
      <ReservationToolBar currentDate={currentDate} dateSetting={dateSetting} setDateSetting={setDateSetting} setReservationsFilter={setReservationsFilter} loadDashboard={loadDashboard} reservations={reservations} />
      <ErrorAlert error={reservationsError} />
      {reservations.map((reservation) => (
          <ReservationCard
            key={reservation.reservation_id}
            reservations={reservation}
            loadDashboard={loadDashboard}
            tables={tables}
          />
      ))}
    </div>
  )
}
