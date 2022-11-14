import React from "react"
import { useHistory } from "react-router-dom"

import ButtonGroup from "react-bootstrap/ButtonGroup"
import Button from "react-bootstrap/Button"
import Tooltip from "react-bootstrap/Tooltip"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"

import { finishReso } from "../../utils/api"

export default function ResercationCardSeatOptions({ reservations, loadDashboard }) {

  const history = useHistory()

  const handleFinish = (event) => {
    event.preventDefault()
    const message = "Is this reservation finished? This cannot be undone."
    if(window.confirm(message)){
      const abortController = new AbortController()
      finishReso(reservations.reservation_id, "finished", abortController.signal)
        .then(loadDashboard)
        .then(() => history.push(`/`))
        .catch(console.log)
    }

  }

  const { reservation_id } = reservations

  return(
    <>
      <ButtonGroup vertical>
        {reservations.status === "booked"
          ? <OverlayTrigger
              transition={false}
              placement="left"
              overlay={<Tooltip id={`reservation-${reservations.reservation_id}-seat-tooltip`}>Seat</Tooltip>}
            >
              <Button
                variant="dark"
                className="d-flex align-items-center text-muted"
                style={{ fontSize: "1.2rem" }}
                href={`/reservations/${reservation_id}/seat`}
              >
                <i className="ri-map-pin-user-fill" />
                Seat
              </Button>
            </OverlayTrigger>
          : null
        }
        {reservations.status === "seated"
          ? <OverlayTrigger
              transition={false}
              placement="left"
              overlay={<Tooltip id={`reservation-${reservations.reservation_id}-finish-tooltip`}>Finish</Tooltip>}
            >
              <Button
                as="a"
                variant="dark"
                className="d-flex align-items-center text-muted"
                style={{ fontSize: "1.2rem" }}
                data-reservation-id-status={reservations.reservation_id}
                onClick={handleFinish}
              >
                <i className="ri-close-circle-fill" />
                Finish
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
            href={`/reservations/${reservation_id}/edit`}
          >
            <i className="ri-pencil-line" />
            Edit
          </Button>
        </OverlayTrigger>
      </ButtonGroup>
    </>
  )
}
