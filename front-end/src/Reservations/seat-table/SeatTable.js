import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'

import { Form, Col, Button, ButtonGroup } from "react-bootstrap"
import ErrorAlert from "../../layout/ErrorAlert"

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

  const handleSeatSubmit = (event) => {
    event.preventDefault()
    seatTable(reservation_id, formData.table_id)
        .then(() => {
            setDateSetting(reservation.reservation_date)
            history.push(`/`)
        })
        .catch(setFormError)
  }

  const handleChange = ({ target }) => {
    setFormError(null)
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }

  const freeTableOptions = freeTables.map((table) => {
    return (
    <option key={table.table_id}>{`Table: ${table.table_name} || Capacity: ${table.capacity}`}</option>
    )
  })
 
  return (
    <Col className="col col-sm-8 col-md-6 col-lg-5 col-xl-4">
      <ErrorAlert error={formError} />
      <Form onSubmit={handleSeatSubmit}>
        <Form.Group controlId="table_id">
            <Form.Label>Select Table:</Form.Label>
            <Form.Control
                as="select"
                name="table_id"
                size="lg"
                placeholder="Select Table"
                required={true}
                onChange={handleChange}
            >
                <option value="" defaultValue>---</option>
                {freeTableOptions}
            </Form.Control>
        </Form.Group>
        <ButtonGroup className="mt-4 w-100">
            <Button
                variant="dark"
                size="lg"
                className="col-3"
                onClick={handleCancel}
            >
                Cancel
            </Button>
            <Button
                variant="success"
                size="lg"
                type="submit"
            >
                Submit
            </Button>
        </ButtonGroup>
      </Form>
    </Col>
  )
}
