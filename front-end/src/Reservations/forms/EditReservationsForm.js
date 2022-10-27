import React from "react"
import { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

import { DateTime } from "luxon"

import ErrorAlert from "../../layout/ErrorAlert"
import Loading from "../../loading/Loading"

import { Col, Form, Button, ButtonGroup, Modal } from "react-bootstrap"

const { deleteReservation, updateReservation, getReservation } = require("../../utils/api")

function EditReservationForm({ currentDate, reservations, setReservations }) {

  const history = useHistory()
  const { reservationId } = useParams()

  const [reservation, setReservation] = useState([])
  const [formError, setFormError] = useState(null)
  const [confirmation, setConfirmation] =  useState(false)
  const [formData, setFormData] = useState({})

  const handleClose = () => setConfirmation(false)
  const handleShow = () => setConfirmation(true)  

  useEffect(() => {
    const abortController = new AbortController()
    getReservation(reservationId, abortController.signal)
      .then(setReservation)
      .then(setFormData(reservation))
      .catch(setFormError)
    return () => abortController.abort()
  }, [reservation, reservationId])

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
    updateReservation(formData, reservationId, abortController.signal)
      .then(() => history.push(`/dashboard`))
      .catch(setFormError)
    return () => abortController.abort()
  }

  const handleCancel = () => {
    history.goBack()
  }

  const handleReservationDelete = (event) => {
    event.preventDefault()
    deleteReservation(reservationId)
      .then(() => history.push("/"))
      .catch(setFormError)
  }

  if(!reservation) {
    return <Loading />
  }

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
              defaultValue={reservation?.first_name}
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
              defaultValue={reservation?.mobile_number}
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
                defaultValue={DateTime.fromISO(reservation.reservation_date).toFormat("yyyy-MM-dd").toString()}
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
              defaultValue={reservation?.reservation_time}
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
              defaultValue={reservation?.people}
              onChange={handleChange}
            />
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mt-4 w-100">
            <Button variant="dark" type="cancel" onClick={handleCancel}>Cancel</Button>
            <Button variant="danger" type="delete" onClick={handleShow}>Delete</Button>
            <Button variant="success" type="submit">Save</Button>
          </ButtonGroup>
        </Form>
      </Col>
      <Modal show={confirmation} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Reservation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          You are about to delete the reservation. This cannot be undone. Continue?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="danger" onClick={handleReservationDelete}>
                Continue
            </Button>
          </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditReservationForm
