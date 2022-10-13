import React from "react"
import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"

import ErrorAlert from "../../layout/ErrorAlert"

import { Col, Form, Button, ButtonGroup } from "react-bootstrap"

function EditReservationForm(){

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

  const handleUpdateSubmit = (event) => {
    event.preventDefault()
  }

  const handleCancel = () => {
    history.goBack()
  }


  return (
    <>
      <Col sm={8} md={6} lg={5} xl={5} className="mb-5">
        <ErrorAlert error />
        <h1 className="d-flex justify-content-center">Create Reservation</h1>
        <Form onSubmit={handleUpdateSubmit}>
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
          <ButtonGroup aria-label="Basic example" className="mt-4 w-100">
            <Button variant="dark" type="cancel" onClick={handleCancel}>Cancel</Button>
            <Button variant="danger" type="delete">Delete</Button>
            <Button variant="success" type="submit">Save</Button>
          </ButtonGroup>
        </Form>
      </Col>
    </>
  )
}