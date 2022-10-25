// add a refresh button to the toolbar
// add an add button to the toolbar
// add a filter for all booked or seated reservations
// add a filter for all reservations that are not seated
import { Button, Dropdown } from 'react-bootstrap'

export default function ReservationToolBar(props) {
  const { date, setDate, reservations, setReservations } = props

  return (
    <div>
      <Button>back arrow</Button>
      <Button>Today</Button>
      <Button>Forward arrow</Button>
      <Button>Refresh</Button>
      <Dropdown className="mt-10 d-flex justify-content-start">
        <Dropdown.Toggle
          className="btn btn-secondary dropdown-toggle mt-2 mb-2"
          variant="dark"
          style={{ fontSize: "1.5rem" }}
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        </svg>
        </Dropdown.Toggle>
          <Dropdown.Menu>
              
          </Dropdown.Menu>
        </Dropdown>
    </div>
  )
}