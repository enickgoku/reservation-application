import React from "react"
import { useHistory } from "react-router-dom"
import { useState } from "react"

import ErrorAlert from "../../layout/ErrorAlert"

import { createReservation } from "../../utils/api"

import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Col from "react-bootstrap/Col"

import "../../layout/Layout.css"


const CreateReservationForm = () => {

  const history = useHistory()

  const [formData, setFormData] = useState({})
  const [formError, setFormError] = useState(null)

  const handleChange = ({ target }) => {
    setFormError(null)
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const reservation = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      mobile_number: formData.mobile_number,
      reservation_date: formData.reservation_date,
      reservation_time: formData.reservation_time,
      people: parseInt(formData.people),
    }

    const abortController = new AbortController()

    createReservation(reservation, abortController.signal)
      .then(() => history.push("/dashboard"))
      .catch(setFormError)

    return () => abortController.abort()
  }

  const handleCancel = () => {
    history.goBack()
  }


  return (
    <>
      <Col sm={8} md={6} lg={5} xl={5} className="mb-5 bg-secondary text-white">
        <ErrorAlert error={formError} />
        <h1 className="d-flex justify-content-center">Create Reservation</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="first_name">
            <Form.Label htmlFor="first_name">First Name</Form.Label>
            <Form.Control id="first_name"
              required={true} 
              name="first_name" 
              type="first_name" 
              placeholder="First Name"
              onChange={handleChange} 
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control id="last_name" 
              required={true} 
              name="last_name" 
              type="last_name" 
              placeholder="Last Name"
              onChange={handleChange} 
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="mobile_number">
            <Form.Label htmlFor="mobile_number">Mobile Number</Form.Label>
            <Form.Control id="mobile_number" 
              required={true} 
              name="mobile_number" 
              type="tel" 
              placeholder="Mobile Number"
              onChange={handleChange} 
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="reservation_date">
            <Form.Label htmlFor="reservation_date">Reservation Date:</Form.Label>
            <Form.Control id="reservation_date"
                type="date"
                name="reservation_date"
                required={true}
                onChange={handleChange}
              />
          </Form.Group>
          <br></br>
          <Form.Group controlId="reservation_time">
            <Form.Label htmlFor="reservation_time">Reservation Time:</Form.Label>
            <Form.Control id="reservation_time"
              type="time"
              name="reservation_time"
              size="lg"
              required={true}
              onChange={handleChange}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="people">
            <Form.Label htmlFor="people">Number of Guests</Form.Label>
            <Form.Control id="people"
              type="number"
              name="people"
              size="lg"
              required={true}
              onChange={handleChange}
            />
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mt-4 w-100">
            <Button variant="dark" type="cancel" onClick={handleCancel}>Cancel</Button>
            <Button variant="success" type="submit">Submit</Button>
          </ButtonGroup>
        </Form>
      </Col>
    </>
  )
}

export default CreateReservationForm