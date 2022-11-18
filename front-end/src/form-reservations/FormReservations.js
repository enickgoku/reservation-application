import React, { useState, useEffect } from "react"
import { useRouteMatch, useHistory, useParams } from "react-router-dom"
import ErrorAlert from "../layout/ErrorAlert"

import { Col, Form, Button, ButtonGroup } from "react-bootstrap"

import { getReservation, updateReservation, deleteReservation, createReservation } from "../utils/api"

export default function FormReservation(props) {

  let {
    setDateSetting,
    loadDashboard,
  } = props

  const history = useHistory()

  const createReservationPath = useRouteMatch("/reservations/new")
  const editReservation = useRouteMatch("/reservations/:reservation_id/edit")

  const { reservation_id } = useParams()

  const header = editReservation ? "Edit Reservation" : "Create Reservation"

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  })
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if (editReservation) {
      loadReservation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function loadReservation() {
    const abortController = new AbortController()
    setFormError(null)
    getReservation(reservation_id, abortController.signal)
      .then(setFormData)
      .catch(setFormError)
    return () => abortController.abort()
  }

  const handleCancel = () => {
    loadDashboard()
    history.push(`/dashboard`)
  }

  const handleChange = ({ target }) => {
    setFormError(null)
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if(editReservation) {

      const data = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        mobile_number: formData.mobile_number,
        reservation_date: formData?.reservation_date,
        reservation_time: formData.reservation_time,
        people: parseInt(formData.people),
        status: "booked",
      }

      const phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

      if(!phoneFormat.test(formData.mobile_number)) {
        setFormError({ message: "Please enter a valid phone number" })
        return null
      }

      updateReservation(data, reservation_id)
        .then(() => setDateSetting(data.reservation_date))
        .then(() => history.push(`/dashboard`))
        .catch(setFormError)
    } else {
    
      const reservation = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        mobile_number: formData.mobile_number,
        reservation_date: formData.reservation_date,
        reservation_time: formData.reservation_time,
        people: parseInt(formData.people),
      }

      const phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

      if(!phoneFormat.test(formData.mobile_number)) {
        setFormError({ message: "Please enter a valid phone number" })
        return null
      }

      const abortController = new AbortController()

      createReservation(reservation, abortController.signal)
        .then(() => {
          setDateSetting(reservation.reservation_date)
          loadDashboard()
          history.push(`/dashboard`)
        })
        .catch(setFormError)
      return () => abortController.abort()
    }
  }

  const handleReservationDelete = () => {
    const message = `Do you want to delete this reservation? This cannot be undone.`
    if (window.confirm(message)) {
      deleteReservation(reservation_id)
        .then(() => loadDashboard())
        .then(() => history.push(`/dashboard`))
        .catch(setFormError)
    }
  }

  // turn formData.reservation_date into "YYYY-MM-DD" format
  const date = formData.reservation_date?.split("T")[0]

  return (
    <>
      <Col sm={8} md={6} lg={5} xl={5} className="mb-5 bg-secondary text-white">
        <ErrorAlert error={formError} />
        <h1 className="d-flex justify-content-center">{header}</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="first_name">First Name</Form.Label>
            <Form.Control id="first_name"
              required={true} 
              name="first_name" 
              type="first_name"
              value={formData.first_name}
              placeholder={createReservationPath ? "First Name" : ""}
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
              value={formData.last_name}
              placeholder={createReservationPath ? "Last Name" : ""}
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
              value={formData.mobile_number}
              placeholder={createReservationPath ? "Mobile Number" : ""} 
              onChange={handleChange} 
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label htmlFor="reservation_date">Reservation Date:</Form.Label>
            <Form.Control id="reservation_date"
                type="date"
                name="reservation_date"
                value={date}
                placeholder={createReservationPath ? "Date" : ""}
                required={true}
                onChange={handleChange}
              />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label htmlFor="reservation_time">Reservation Time:</Form.Label>
            <Form.Control id="reservation_time"
              type="time"
              name="reservation_time"
              value={formData.reservation_time}
              placeholder={createReservationPath ? "HH:MM" : ""}
              size="lg"
              required={true}
              onChange={handleChange}
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label htmlFor="people">Number of Guests</Form.Label>
            <Form.Control id="people"
              type="number"
              name="people"
              value={formData.people}
              placeholder={createReservationPath ? "Party Size" : ""}
              size="lg"
              required={true}
              onChange={handleChange}
            />
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mt-4 w-100">
            <Button variant="dark" type="cancel" onClick={handleCancel}>Cancel</Button>
            {editReservation ? <Button variant="danger" type="button" onClick={handleReservationDelete}>Delete</Button> : null}
            <Button variant="success" type="submit">Submit</Button>
          </ButtonGroup>
        </Form>
      </Col>
    </>
  )
}
