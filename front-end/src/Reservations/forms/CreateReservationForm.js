import React from "react"

import Form from "react-bootstrap/Form"

import "../../layout/Layout.css"


const CreateReservationForm = () => {
  return (
    <>
      <div className="d-flex justify-content-center h1-div">
        <h1>Create Reservation</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label htmlFor="first_name">First Name</Form.Label>
            <Form.Control required={true} name="first_name" type="first_name" placeholder="First Name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control required={true} name="last_name" type="last_name" placeholder="Last Name" />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="mobile_number">Mobile Number</Form.Label>
            <Form.Control required={true} name="mobile_number" type="tel" placeholder="Mobile Number" />
          </Form.Group>
        </Form>
      </div>
    </>
  )
}

export default CreateReservationForm