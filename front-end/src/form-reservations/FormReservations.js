import React from "react"
import { useRouteMatch } from "react-router-dom"

import CreateReservationForm from "../reservations/forms/CreateReservationForm"
import EditReservationsForm from "../reservations/forms/EditReservationsForm"

export default function FormReservation(props) {

  const createReservation = useRouteMatch("/reservations/new")
  const editReservation = useRouteMatch("/reservations/:reservation_id/edit")

  return (
    <>
      {createReservation ? <CreateReservationForm {...props} /> : null}
      {editReservation ? <EditReservationsForm {...props} /> : null}
    </>
  )
}
