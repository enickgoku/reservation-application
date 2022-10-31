import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import { Form, Button, ButtonGroup, InputGroup } from 'react-bootstrap'
import ReservationCard from '../reservations/reservations-card/ReservationCard'
import ErrorAlert from '../layout/ErrorAlert'

import { listReservations } from '../utils/api'

export default function SearchForm(props) {

  const history = useHistory()

  const [formError, setFormError] = useState(null)
  const [formData, setFormData] = useState("")
  const [reservations, setReservations] = useState([])
  const [displayReservations, setDisplayReservations] = useState("")


  const handleChange = ({ target }) => {
    setFormError(null)
    setFormData({ ...formData, [target.name]: target.value })
  }

  const handleSubmit = (event) => {
    const abortController = new AbortController()
    event.preventDefault()
    listReservations({ mobile_number: formData }, abortController.signal)
      .then(setReservations)
      .catch(setFormError)
    return () => abortController.abort()
  } 

  const handleCancel = () => {
    history.goBack()
  }

  if (reservations.length > 0){
    return (
      <div>
        <h2>Reservations</h2>
        <div className="d-md-flex flex-wrap">
          {reservations.map((reservation) => (
            <ReservationCard key={reservation.reservation_id} reservation={reservation} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <ErrorAlert error={formError} />
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <label>Search Reservations with a phone number</label>
          <InputGroup.Text id="mobile_number" className='w-100 bg-dark text-white'>Search</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Mobile Number"
            aria-label="Mobile Number"
            aria-describedby="basic-addon1"
            name="mobile_number"
            onChange={handleChange}
          />
        </InputGroup>
        <ButtonGroup>
          <Button type="submit" variant="success">
            Submit
          </Button>
          <Button type="button" variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
        </ButtonGroup>
      </Form> 
    </>
  )
}
