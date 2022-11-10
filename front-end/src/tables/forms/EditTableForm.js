import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

import ErrorAlert from "../../layout/ErrorAlert"

import { Col, Form, Button, ButtonGroup } from "react-bootstrap"

import { updateTable, deleteTable, getTable } from "../../utils/api"

export default function EditTableForm({ setTables }) {
  
  const history = useHistory()
  const { table_id } = useParams()

  const [table, setTable] = useState({
    table_name: "",
    capacity: "",
    reservation_id: null,
  })

  const [formData, setFormData] = useState({})
  const [formError, setFormError] = useState(null)
  
  useEffect(() =>{
    const abortController = new AbortController()
    getTable(table_id, abortController.signal)
      .then(setTable)
      .catch(setFormError)
    return () => abortController.abort()
  }, [table.capacity, table.table_name, table_id])
  
  useEffect(() => {
    setFormData({
      table_name: table.table_name,
      capacity: table.capacity,
      reservation_id: null,
    })
  }, [table])

  const handleChange = ({ currentTarget }) => {
    setFormError(null)
    setFormData({
      ...formData,
      [currentTarget.name]: currentTarget.value,
    })
  }

  const handleCancelClick = () => {
    history.goBack()
  }

  const data = {
    table_name: formData.table_name,
    capacity: formData.capacity,
    reservation_id: table.reservation_id
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const abortController = new AbortController()
    updateTable(data, table_id, abortController.signal)
      .then(setTables)
      .then(() => history.push("/"))
      .catch(setFormError)
    return () => abortController.abort()
  }

  const handleTableDelete = (event) => {
    event.preventDefault()
    const message = `Are you sure you want to delete table ${table.table_name}?`
    if (window.confirm(message)) {
      const abortController = new AbortController()
      deleteTable(table_id, abortController.signal)
        .then(setTables)
        .then(() => history.push("/"))
        .catch(setFormError)
      return () => abortController.abort()
    }
  }

  return (
    <>
      <Col sm={8} md={6} lg={5} xl={5} className="mb-5">
        <ErrorAlert error={formError} />
        <h1 className="d-flex justify-content-center">Edit Table</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="table_name">Table Name: </Form.Label>
            <Form.Control id="table_name"
              required={true} 
              name="table_name" 
              type="text" 
              defaultValue={table.table_name}
              onChange={handleChange} 
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>Capacity</Form.Label>
            <Form.Control id="capacity" 
              required={true} 
              name="capacity" 
              type="number" 
              defaultValue={table.capacity}
              onChange={handleChange} 
            />
          </Form.Group>
          <ButtonGroup className="mt-4 w-100">
            <Button
              variant="dark"
              size="lg"
              className="col-3"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="lg"
              onClick={handleTableDelete}
            >
              Delete
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
    </>
  )
}
