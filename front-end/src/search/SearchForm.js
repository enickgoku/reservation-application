import React, { useState, useEffect } from 'react'

import { useHistory, useParams } from 'react-router-dom'

import { Form, Col, Button, ButtonGroup } from 'react-bootstrap'
import ErrorAlert from '../../layout/ErrorAlert'

import { search } from '../../utils/api'

export default function SearchForm(props) {
  const history = useHistory()
  // create a component that will be used to search for a reservation by phone number
  // the component should have a form with a single input field for the phone number
  // the component should have a submit button
  // the component should have a cancel button that returns the user to the dashboard
  // the component should have a clear button that clears the input field

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

  const handleClear = () => {
    setFormData({})
  }

  return (
    <>
      
    </>
  )
  
}
