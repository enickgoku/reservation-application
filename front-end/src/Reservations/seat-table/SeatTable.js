import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'

import { Form, Col, Row, Button, ButtonGroup } from "react-bootstrap"
import ErrorAlert from "../layout/ErrorAlert"

import { getReservation, listTables, seatTable } from "../../utils/api"

export default function SeatTable(props){

  let {
    setDateSetting
  } = props

  const history = useHistory()
  const { reservation_id } = useParams()

  const [freeTables, setFreeTables] = useState([])
  const [formError, setFormError] = useState(null)
  const [formData, setFormData] = useState({})
  const [reservation, setReservation] = useState({})

  useEffect(() => {
    function loadReservation() {
        const abortController = new AbortController()
        getReservation(reservation_id, abortController.signal)
            .then((response) => {
                setReservation(response)
                setDateSetting(response.reservation_date)
            })
            .catch(setFormError)
        return () => abortController.abort()
    }
    function loadFreeTables() {
        const abortController = new AbortController()
        listTables(abortController.signal)
            .then(setFreeTables)
            .catch(setFormError)
        return () => abortController.abort()
    }
    loadReservation()
    loadFreeTables()
  }, [reservation_id, setDateSetting])

  const handleCancel = () => {
    history.goBack()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    seatTable(reservation_id, formData.table_id)
        .then(() => {
            setDateSetting(reservation.reservation_date)
            history.push(`/`)
        })
        .catch(setFormError)
  }

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }

  const freeTableOptions = freeTables.map((table, index) => {
    return (
    <option key={index} value={table.table_id}>{table.table_name - table.capacity}</option>
    )
  })
 
  return (
    <Col className="col col-sm-8 col-md-6 col-lg-5 col-xl-4">
      <ErrorAlert error={formError} />
      <h1>Seat Table</h1>
    </Col>
  )
}