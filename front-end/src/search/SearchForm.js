import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import { Form, Button, ButtonGroup, InputGroup } from 'react-bootstrap'
import ErrorAlert from '../layout/ErrorAlert'

import { search } from '../utils/api'

export default function SearchForm(props) {
  const history = useHistory()

  const [formError, setFormError] = useState(null)
  const [formData, setFormData] = useState({})
  const [reservations, setReservations] = useState([])
  const [searched, setSearched] = useState(false)

  const handleChange = ({ target }) => {
    setFormError(null)
    setFormData({ ...formData, [target.name]: target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSearched(true)
    search(formData.mobile_number)
      .then(setReservations)
      .catch(setFormError)
      setFormData({})
  } 

  const handleCancel = () => {
    history.goBack()
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
            placeholder="Username"
            aria-label="Username"
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
