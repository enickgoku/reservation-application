import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Tooltip from "react-bootstrap/Tooltip"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"

import { finishReso } from "../../utils/api"

export default function ResercationCardSeatOptions({ reservations }){

  const history = useHistory()

  const [showConfirm, setShowConfirm] = useState(false)

  const handleClose = () => setShowConfirm(false)
  const handleShow = () => setShowConfirm(true)

  const handleFinish = (event) => {
    event.preventDefault()
    finishReso(reservations.reservation_id, "finished")
      .then(() => {
        handleClose()
        history.push(`/dashboard`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return(
    <>
      <ButtonGroup vertical>
        {reservations.status === "booked"
          ? <OverlayTrigger
              transition={false}
              placement="left"
              overlay={<Tooltip id={`reservation-${reservations.reservation_id}-seat-tooltip`}>Seat To Table</Tooltip>}
            >
              <Button
                variant="dark"
                className="d-flex align-items-center text-muted"
                style={{ fontSize: "1.2rem" }}
                href={`/reservations/${reservations.reservation_id}/seat`}
              >
                <i className="ri-map-pin-user-fill" />
              </Button>
            </OverlayTrigger>
          : null
        }
        {reservations.status === "seated"
          ? <OverlayTrigger
              transition={false}
              placement="left"
              overlay={<Tooltip id={`reservation-${reservations.reservation_id}-finish-tooltip`}>Finish Reservation</Tooltip>}
            >
              <Button
                as="a"
                variant="dark"
                className="d-flex align-items-center text-muted"
                style={{ fontSize: "1.2rem" }}
                onClick={handleShow}
              >
                <i className="ri-close-circle-fill" />
              </Button>
            </OverlayTrigger>
          : null
        }
        <OverlayTrigger
          transition={false}
          placement="left"
          overlay={<Tooltip id={`reservation-${reservations.reservation_id}-edit-tooltip`}>Edit</Tooltip>}
        >
          <Button
            as="a"
            variant="dark"
            className="d-flex align-items-center text-muted"
            style={{ fontSize: "1.2rem" }}
            href={`/reservations/${reservations.reservation_id}/edit`}
          >
            <i className="ri-pencil-line" />
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
      <Modal
        animation={false}
        show={showConfirm}
        onHide={handleClose}
        backdrop="static"
      >
          <Modal.Header>
          <Modal.Title>Finish Reservation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You are about to mark this reservation as finished. This cannot be undone. Continue?
          </Modal.Body>
          <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
              Cancel
          </Button>
          <Button variant="danger" onClick={handleFinish}>
              Continue
          </Button>
          </Modal.Footer>
        </Modal>
    </>
  )
}