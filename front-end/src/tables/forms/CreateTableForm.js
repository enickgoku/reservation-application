import React from "react"
import { useState } from "react"
import { useHistory } from 'react-router-dom'

import ErrorAlert from "../../layout/ErrorAlert"

import Form from 'react-bootstrap/Form'
import Col from "react-bootstrap/Col"
import Button from 'react-bootstrap/Button'
import ButtonGroup from "react-bootstrap/ButtonGroup"

import { createTable } from "../../utils/api"


export default function CreateTableForm({ setTables }) {
  
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

  const handleCancelClick = () => {
    history.push("/dashboard")
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const abortController = new AbortController()
    createTable(formData, abortController.signal)
      .then(setTables(prev => {
        prev.push(formData)
        return prev
      }))
      .then(() => history.push(`/reservations/new`))
      .catch(setFormError)
    return () => abortController.abort()
  }


  return (
    <>
      <Col sm={8} md={6} lg={5} xl={5} className="mb-5">
        <ErrorAlert error={formError} />
        <h1 className="d-flex justify-content-center">Create Table</h1>
        <Form>
          <Form.Group>
            <Form.Label htmlFor="table_name">Table Name: </Form.Label>
            <Form.Control id="table_name"
              required={true} 
              name="table_name" 
              type="text" 
              placeholder="Ex. Table 1"
              onChange={handleChange} 
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label htmlFor="capacity">Capacity: </Form.Label>
            <Form.Control id="capacity" 
              required={true} 
              name="capacity" 
              type="number" 
              placeholder="6"
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
                variant="success"
                size="lg"
                type="submit"
                onClick={handleSubmit}
            >
                Submit
            </Button>
          </ButtonGroup>
          <br></br>
        </Form>
      </Col>
    </>
  )
}
