import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Modal, Button, ButtonGroup, OverlayTrigger, Tooltip } from "react-bootstrap"

import { removeReservation } from '../../utils/api'



export default function TableCardOptions(props) {

  
  let {
    table,
    setTablesError
  } = props

  const history = useHistory()

  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleClose = () => setShowConfirmation(false)
  const handleShow = () => setShowConfirmation(true)

  function handleDismissReservation() {
    removeReservation(table.table_id, table.reservation_id)
      .then(() => history.push("/"))
      .catch(() => setTablesError())
  }

  return (
    <>
      <ButtonGroup vertical>
        {table.reservation_id
          ? <OverlayTrigger
              transition={false}
              placement="left"
              overlay={<Tooltip id={`table-${table.table_id}-dismiss-tooltip`}>Dismiss Guests</Tooltip>}
            >
              <Button
                variant="dark"
                className="d-flex align-items-center text-muted border border-list-bg"
                data-table-id-finish={table.table_id}
                style={{ fontSize: "1.2rem" }}
                onClick={handleShow}
              >
                <i className="ri-user-unfollow-fill" />
              </Button>
            </OverlayTrigger>
          : null}
        <OverlayTrigger
            transition={false}
            placement="left"
            overlay={<Tooltip id={`table-${table.table_id}-edit-tooltip`}>Edit</Tooltip>}
        >
          <Button
            variant="dark"
            className="d-flex align-items-center text-muted border border-list-bg"
            style={{ fontSize: "1.2rem" }}
            href={`/tables/${table.table_id}/edit`}
          >
            <i className="ri-pencil-line" />
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
      <Modal
        animation={false}
        show={showConfirmation}
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Dismiss Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Is this table ready to seat new guests? This will mark the reservation as finished and cannot be undone. Continue?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" data-table-id-finish={table.table_id} autoFocus={true} onClick={handleDismissReservation}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
