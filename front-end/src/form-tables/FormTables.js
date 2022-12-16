import React, { useState, useEffect } from "react"
import { useRouteMatch, useHistory, useParams } from "react-router-dom"

import ErrorAlert from "../layout/ErrorAlert"

import { Col, Form, Button, ButtonGroup } from "react-bootstrap"

import { getTable, updateTable, deleteTable, createTable } from "../utils/api"

export default function FormTables(props) {

  let {
    setTables,
    loadDashboard,
  } = props

  const history = useHistory()
  const { table_id } = useParams()

  const createRoute = useRouteMatch("/tables/new")
  const editRoute = useRouteMatch("/tables/:table_id/edit")

  const header = editRoute ? "Edit Table" : "Create Table"

  const [formData, setFormData] = useState({
    table_name: "",
    capacity: "",
    reservation_id: null,
  })
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if (editRoute) {
      loadTable()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [])

  function loadTable() {
    const abortController = new AbortController()
    setFormError(null)
    getTable(table_id, abortController.signal)
      .then(setFormData)
      .catch(setFormError)
    return () => abortController.abort()
  }

  const handleChange = ({ target }) => {
    setFormError(null)
    setFormData({
      ...formData,
      [target.name]: target.value,
    })
  }

  const handleCancelClick = () => {
    history.goBack()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const abortController = new AbortController()

    if (editRoute) {

      const data = {
        table_name: formData.table_name,
        capacity: +formData.capacity,
        reservation_id: formData.reservation_id
      }

      updateTable(data, table_id, abortController.signal)
        .then(setTables)
        .then(() => history.push("/"))
        .catch(setFormError)
      return () => abortController.abort()
    } else {

      const table = {
        table_name: formData.table_name,
        capacity: +formData.capacity,
        reservation_id: null,
      }

      createTable(table, abortController.signal)
        .then(setTables)
        .then(() => history.push("/"))
        .catch(setFormError)
      return () => abortController.abort()
    }
  }

  const handleTableDelete = (event) => {
    event.preventDefault()
    const message = `Are you sure you want to delete table ${formData.table_name}?`
    if (window.confirm(message)) {
      const abortController = new AbortController()
      deleteTable(table_id, abortController.signal)
        .then(() => loadDashboard()) 
        .then(() => history.push("/"))
        .catch(setFormError)
      return () => abortController.abort()
    }
  }

  return (
    <>
      <Col sm={8} md={6} lg={5} xl={5} className="mb-5">
        <ErrorAlert error={formError} />
        <h1 className="d-flex justify-content-center">{header}</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="table_name">Table Name: </Form.Label>
            <Form.Control id="table_name"
              required={true} 
              name="table_name" 
              type="text" 
              value={formData.table_name}
              placeholder={createRoute ? "Table Name" : ""}
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
              value={formData.capacity}
              placeholder={createRoute ? "Capacity" : ""}
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
            {editRoute ? 
            <Button
              variant="danger"
              size="lg"
              onClick={handleTableDelete}
            >
              Delete
            </Button> : null}
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
