import React from 'react'
import { useHistory } from 'react-router-dom'

import { Button, ButtonGroup, OverlayTrigger, Tooltip } from "react-bootstrap"

import { removeReservation } from '../../utils/api'



export default function TableCardOptions(props) {
  
  let {
    table,
    setTablesError
  } = props

  const history = useHistory()

  function handleDismissReservation() {
    const message = "Is this table ready to seat new guests? This cannot be undone."
    if (window.confirm(message)) {
      const abortController = new AbortController()
      removeReservation(table.table_id, table.reservation_id, abortController.signal)
        .then(() => history.push("/"))
        .catch(setTablesError)
      return () => abortController.abort()
    }
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
                onClick={handleDismissReservation}
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
    </>
  )
}
