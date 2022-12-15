import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react'

const reducer = (state, action) => {
  const { type, payload ={} } = action

  console.debug('useTables', type, payload)

  switch (type) {
    
  }
}