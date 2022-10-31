import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import { Form, Button, ButtonGroup, InputGroup } from 'react-bootstrap'
import ReservationCard from '../reservations/reservations-card/ReservationCard'
import ErrorAlert from '../layout/ErrorAlert'
import Loading from '../loading/Loading'

import { listReservations } from '../utils/api'

export default function SearchForm() {

  const history = useHistory()

  const [formError, setFormError] = useState(null)
  const [formData, setFormData] = useState({})
  const [reservations, setReservations] = useState("")
  const [displayReservations, setDisplayReservations] = useState("")


  const handleChange = ({ target }) => {
    setFormError(null)
    setFormData({ ...formData, [target.name]: target.value })
  }

  const handleSubmit = (event) => {
    setDisplayReservations(<Loading />)
    const abortController = new AbortController()
    event.preventDefault()
    listReservations(formData, abortController.signal)
      .then(setReservations)
      .catch(setFormError)
    return () => abortController.abort()
  } 

  const handleCancel = () => {
    history.goBack()
  }

  console.log(reservations)

  useEffect(() => {
    if (reservations.length) {
      setDisplayReservations(
        reservations.map((reservation, index) => {
          return (
            <div key={reservation.reservation_id}>
              <ReservationCard reservations={reservation} />
            </div>
          )
        })
      )
    } else if (reservations !== "") {
      setDisplayReservations(
        <div>
          <h3>No reservations found</h3>
        </div>
      )
    }
  }, [reservations])

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

      <div className="d-flex">
        {displayReservations}
      </div> 
    </>
  )
}
