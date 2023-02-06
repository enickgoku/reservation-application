import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react'

import { createTable, listTables, getTable } from '../utils/api'

const reducer = (state, action) => {
  const { type, payload = {} } = action

  console.debug('useTables', type, payload)

  switch (type) {
    case 'CREATE_TABLE': {

      const { table } = payload

      return {
        ...state,
        table,
      }
    }
    case 'CREATE_TABLE_PENDING': {
      return {
        ...state,
        loading: true, 
        error: null,
      }
    }
    case 'CREATE_TABLE_FAIL': {
      const { error } = payload

      return {
        ...state,
        error,
      }
    }
    case 'EDIT_TABLE': {
      const { table } = payload

      return {
        ...state,
        table,
      }
    }
    case 'EDIT_TABLE_FAIL': {
      const { error } = payload
      
      return {
        ...state,
        error,
      }
    }
    case 'DELETE_TABLE': {
      const { table_id } = payload

      return {
        ...state,
        tables: state.tables.filter((table) => table.table_id !== table_id),
      }
    }
    case 'FETCH_TABLES_COMPLETE': {
      const { tables } = payload

      return {
        ...state,
        tables,
      }
    }
    case 'FETCH_TABLES_PENDING': {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case 'FETCH_TABLES_FAIL': {
      const { error } = payload

      return {
        ...state,
        error,
      }
    }
    default: 
      throw new Error(`Unknown action type: ${type}`)
  }
}

const initialState = {
  tables: [],
  table: {},
  loading: true,
  error: null,
}

const TablesContext = createContext(initialState)

export const TablesProvider = ({ children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const createNewTable = useCallback((data) => {
    dispatch({ type: 'CREATE_TABLE_PENDING'})

    return createTable(data)
      .then((table) => {
        dispatch({
          type: 'CREATE_TABLE_COMPLETE',
          payload: {
            table,
          }
        })
      })
      .catch((error) => {
        dispatch({
          type: 'CREATE_TABLE_FAIL',
          payload: {
            error,
          },
        })
      })
  })

  const value = useMemo(
    () => ({
      createNewTable,
    }),
    [createNewTable]
  )

  return (
    <TablesContext.Provider value={value}>
      {children}
    </TablesContext.Provider>
  )
}