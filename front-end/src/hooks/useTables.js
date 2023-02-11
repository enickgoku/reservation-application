import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react'

import { createTable, listTables, getTable, updateTable } from '../utils/api'

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
    case 'EDIT_TABLE_COMPLETE': {
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
    case 'FETCH_TABLE_PENDING': {
      return {
        ...state,
        loading: true,
        error: null,
      }
    }
    case 'FETCH_TABLE_COMPLETE': {
      const { table } =  payload

      return {
        ...state,
        table,
      }
    }
    case ' FETCH_TABLE_FAIL': {
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
  }, [])

  const editTable = useCallback((table) => {
    dispatch({ type: 'EDIT_TABLE_PENDING' })

    return updateTable(table)
      .then((table) => {
        dispatch({
          type: 'EDIT_TABLE_COMPLETE',
          payload: {
            table,
          },
        })
      })
      .catch((error) => {
        dispatch({
          type: 'EDIT_TABLE_FAIL',
          payload: {
            error,
          },
        })
      }) 
  }, [])

  const fetchTables = useCallback((status) => {
    dispatch({ type: 'FETCH_TABLES_PENDING'})

    return listTables(status)
      .then((tables) => {
        dispatch({
          type: 'FETCH_TABLES_COMPLETE',
          payload: {
            tables,
          }
        })
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_TABLES_FAIL',
          payload: {
            error,
          },
        })
      })
  }, [])

  const fetchTable = useCallback((table_id) => {
    dispatch({ type: 'FETCH_TABLE_PENDING' })

    return getTable(table_id)
      .then((table) => {
        dispatch({
          type: 'FETCH_TABLE_COMPLETE',
          payload: {
            table,
          }
        })
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_TABLE_FAIL',
          payload: {
            error,
          },
        })
      })
  }, [])

  const tables = useMemo(() => {
    return state.tables
  }, [state.tables])

  const value = useMemo(
    () => ({
      createNewTable,
      editTable,
      fetchTable,
      fetchTables,
      tables,
    }),
    [createNewTable, editTable, fetchTable, fetchTables, tables]
  )

  return (
    <TablesContext.Provider value={value}>
      {children}
      
    </TablesContext.Provider>
  )
}

export const useTables = () => useContext(TablesContext)
