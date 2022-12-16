import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react'

import { createReservation, listReservations, getReservation } from '../utils/api'

const reducer = (state, action) => {
  const { type, payload = {} } = action

  console.debug('useReservations', type, payload)

  switch (type) {
    case 'CREATE_RESERVATION': {
      const { reservation } = payload

      createReservation(reservation.reservation_id)

      return {
        ...state,
        reservation,
      }
    }
    case 'CREATE_RESERVATION_FAIL': {
      const { error } = payload

      return {
        ...state,
        error,
      }
    }
    case 'EDIT_RESERVATION': {
      const { reservation } = payload

      return {
        ...state,
        reservation,
      }
    }
    case 'EDIT_RESERVATION_FAIL': {
      const { error } = payload

      return {
        ...state,
        error,
      }
    }
    case 'DELETE_RESERVATION': {
      const { reservation_id } = payload
      
      return {
        ...state,
        reservations: state.reservations.filter(
          (reso) => reso.id !== reservation_id
        ),
      }
    }
    case 'FETCH_RESERVATIONS_PENDING': {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case 'FETCH_RESERVATIONS_COMPLETE': {
      const { data } = payload

      return {
        ...state,
        reservations: data,
        loading: false,
      }
    }
    case 'FETCH_RESERVATIONS_FAIL': {
      const { error } = payload

      return {
        ...state,
        error,
      }
    }
    case 'FETCH_RESERVATION': {
      const { reservation } = payload

      getReservation(reservation.reservation_id)

      return {
        ...state,
        reservation,
      }
    }
    default: 
      throw new Error(`Unknown action type: ${type}`)
  }
}

const inititalState = {
  reservations: [],
  reservation: {},
  loading: true,
  error: null,
}

const ReservationsContext = createContext(inititalState)

export const ReservationsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, inititalState)

  const createReservation = useCallback((reservation) => {
    dispatch({
      type: 'CREATE_RESERVATION',
      payload: {
        reservation,
      },
    })
  }, [])

  const createReservationFail = useCallback((error) => {
    dispatch({
      type: 'CREATE_RESERVATION_FAIL',
      payload: {
        error,
      },
    })
  }, [])

  const editReservation = useCallback((reservation) => {
    dispatch({
      type: 'EDIT_RESERVATION',
      payload: {
        reservation,
      },
    })
  }, [])

  const editReservationFail = useCallback((error) => {
    dispatch({
      type: 'EDIT_RESERVATION_FAIL',
      payload: {
        error,
      },
    })
  }, [])

  const deleteReservation = useCallback((reservation_id) => {
    dispatch({
      type: 'DELETE_RESERVATION',
      payload: {
        reservation_id,
      },
    })
  }, [])

  const fetchReservations = useCallback(({ date, phase }, signal) => {
    dispatch({
      type: 'FETCH_RESERVATIONS_PENDING',
      payload: {
        loading: true,
      },
    })
    listReservations({ date, phase }, signal)
      .then((data) => {
        dispatch({
          type: 'FETCH_RESERVATIONS_COMPLETE',
          payload: {
            data,
          }
        })
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_RESERVATIONS_FAIL',
          payload: {
            error,
          }
        })
      })
  }, [])

  const reservations = useMemo(() => {
    return state.reservations
  }, [state.reservations])

  const fetchReservation = useCallback((reservation_id) => {
    dispatch({
      type: 'FETCH_RESERVATION',
      payload: {
        reservation_id,
      },
    })
  }, [])

  const value = useMemo(
    () => ({
      createReservation,
      createReservationFail,
      editReservation,
      editReservationFail,
      deleteReservation,
      fetchReservations,
      fetchReservation,
      reservations,
    }),
    [createReservation, createReservationFail, deleteReservation, editReservation, editReservationFail, fetchReservation, fetchReservations, reservations]
  )

  return (
    <ReservationsContext.Provider value={value}>
      {children}
    </ReservationsContext.Provider>
  )
}

export const useReservations = () => useContext(ReservationsContext)
