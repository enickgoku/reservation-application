import React from "react"
import { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

import { DateTime } from "luxon"

import ErrorAlert from "../../layout/ErrorAlert"
import Loading from "../../loading/Loading"

import { Col, Form, Button, ButtonGroup } from "react-bootstrap"

const { deleteReservation, updateReservation, getReservation } = require("../../utils/api")

function EditReservationsForm(props) {

  let {
    loadDashboard,
    reservations,
    setDateSetting,
  } = props

  const history = useHistory()
  const { reservation_id } = useParams()

  const [formError, setFormError] = useState(null)
  const [formData, setFormData] = useState({})   

  useEffect(() => {
    const abortController = new AbortController()
    getReservation(reservation_id, abortController.signal)
      .then(setFormData)
      .catch(setFormError)
    return () => abortController.abort()
  }, [reservation_id, reservations])

  const handleChange = ({ currentTarget }) => {
    setFormError(null)
    setFormData({
      ...formData,
      [currentTarget.name]: currentTarget.value,
    })
  }

  const handleUpdateSubmit = (event) => {
    event.preventDefault()
    const abortController = new AbortController()
    const data = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      mobile_number: formData.mobile_number,
      reservation_date: formData.reservation_date,
      reservation_time: formData.reservation_time,
      people: parseInt(formData.people),
      status: "booked",
    }
    updateReservation(data, reservation_id, abortController.signal)
      .then(setDateSetting(formData.reservation_date))
      .then(loadDashboard)
      .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
      .catch(setFormError)
    return () => abortController.abort()
  }

  const handleCancel = () => {
    history.goBack()
  }

  const handleReservationDelete = (event) => {
    event.preventDefault()
    const message = `Do you want to delete this reservation? This cannot be undone.`
    if (window.confirm(message)) {
      const abortController = new AbortController()
      deleteReservation(reservation_id, abortController.signal)
        .then(() => history.push(`/dashboard`))
        .then(loadDashboard)
        .catch(setFormError)
      return () => abortController.abort()
    }
  }

  // const handleReservationCancel = (event) => {
  //   event.preventDefault()
  //   const message = "Do you want to cancel this reservation?"
  //   if (window.confirm(message)) {
  //     finishReso(reservation_id, "cancelled")
  //       .then(() => history.push("/dashboard"))
  //       .then(loadDashboard)
  //       .catch(setFormError)
  //   }
  // }

  if(!formData) {
    return <Loading />
  }

  const reservationDate = formData?.reservation_date
    ? DateTime.fromISO(formData.reservation_date).toFormat("yyyy-MM-dd")
    : ""

  return (
    <>
      <Col sm={8} md={6} lg={5} xl={5} className="mb-5">
        <ErrorAlert error={formError} />
        <h1 className="d-flex justify-content-center">Edit Reservation</h1>
        <Form onSubmit={handleUpdateSubmit}>
          <Form.Group>
            <Form.Label htmlFor="first_name">First Name</Form.Label>
            <Form.Control id="first_name"
              required={true} 
              name="first_name" 
              type="first_name" 
              defaultValue={formData.first_name}
              onChange={handleChange} 
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control id="last_name" 
              required={true} 
              name="last_name" 
              type="last_name" 
              defaultValue={formData?.last_name}
              onChange={handleChange} 
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label htmlFor="mobile_number">Mobile Number</Form.Label>
            <Form.Control id="mobile_number" 
              required={true} 
              name="mobile_number" 
              type="tel" 
              defaultValue={formData?.mobile_number}
              onChange={handleChange} 
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label htmlFor="reservation_date">Reservation Date:</Form.Label>
            <Form.Control id="reservation_date"
                type="date"
                name="reservation_date"
                required={true}
                defaultValue={reservationDate}
                onChange={handleChange}
              />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label htmlFor="reservation_time">Reservation Time:</Form.Label>
            <Form.Control id="reservation_time"
              type="time"
              name="reservation_time"
              size="lg"
              required={true}
              defaultValue={formData?.reservation_time}
              onChange={handleChange}
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label htmlFor="people">Number of Guests</Form.Label>
            <Form.Control id="people"
              type="number"
              name="people"
              size="lg"
              required={true}
              defaultValue={formData?.people}
              onChange={handleChange}
            />
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mt-4 w-100">
            <Button variant="dark" onClick={handleCancel}>Cancel</Button>
            <Button variant="danger" onClick={handleReservationDelete}>Delete</Button>
            <Button variant="success" type="submit">Submit</Button>
          </ButtonGroup>
        </Form>
      </Col>
    </>
  )
}

export default EditReservationsForm
