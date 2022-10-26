import { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

import ErrorAlert from "../../layout/ErrorAlert"

import { Col, Form, Button, ButtonGroup, Modal } from "react-bootstrap"

import { updateTable, deleteTable, getTable } from "../../utils/api"

export default function EditTableForm({ setTables }) {
  
  const history = useHistory()
  const { tableId } = useParams()

  const [table, setTable] = useState({
    table_name: "",
    capacity: "",
    reservation_id: null,
  })
  const [formData, setFormData] = useState(table)
  const [formError, setFormError] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleClose = () => setShowConfirmation(false)
  const handleShow = () => setShowConfirmation(true)

  useEffect(() =>{
    const abortController = new AbortController()
    getTable(tableId, abortController.signal)
      .then(setTable)
      .catch(setFormError)
    return () => abortController.abort()
  }, [tableId])

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
    updateTable(formData, tableId, abortController.signal)
      .then(() => history.push(`/dashboard`))
      .catch(setFormError)
    return () => abortController.abort()
  }

  const handleTableDelete = (event) => {
    event.preventDefault()
    deleteTable(tableId)
      // delete table from tables array
      .then(() => {
        setTables(prev => {
          const index = prev.findIndex(table => table.table_id === tableId)
          prev.splice(index, 1)
          return prev
        })
      })
      .then(() => history.push("/dashboard"))
      .catch(setFormError)
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
              type="table_name" 
              defaultValue={table?.table_name}
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
              defaultValue={table?.capacity}
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
