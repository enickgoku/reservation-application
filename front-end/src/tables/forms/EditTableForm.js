import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"

import ErrorAlert from "../../layout/ErrorAlert"

import { Col, Form, Button, ButtonGroup, Modal } from "react-bootstrap"

import { editTable, deleteTable } from "../../utils/api"

export default function EditTableForm() {
  
  const history = useHistory()
  const { tableId } = useParams()

  const [formData, setFormData] = useState({})
  const [formError, setFormError] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleClose = () => setShowConfirmation(false)
  const handleShow = () => setShowConfirmation(true)
  
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
    editTable(formData, abortController.signal)
      .then(() => history.push(`/dashboard`))
      .catch(setFormError)
    return () => abortController.abort()
  }

  const handleTableDelete = (event) => {
    event.preventDefault()
    deleteTable(tableId)
        .then(() => history.push("/"))
        .catch(setFormError)
  }

  return (
    <>
      <Col sm={8} md={6} lg={5} xl={5} className="mb-5">
        <ErrorAlert error={formError} />
        <h1 className="d-flex justify-content-center">Create Table</h1>
        <Form>
          <Form.Group controlId="table_name">
            <Form.Label htmlFor="table_name">Table Name: </Form.Label>
            <Form.Control id="table_name"
              required={true} 
              name="table_name" 
              type="table_name" 
              placeholder="Ex. Table 1"
              onChange={handleChange} 
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="capacity">
            <Form.Label>Last Name</Form.Label>
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
                variant="danger"
                size="lg"
                onClick={handleShow}
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
          <br></br>
        </Form>
      </Col>
      <Modal show={showConfirmation} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Reservation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          You are about to delete this Table. This cannot be undone. Continue?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="danger" onClick={handleTableDelete}>
                Delete
            </Button>
          </Modal.Footer>
      </Modal>
    </>
  )
}
