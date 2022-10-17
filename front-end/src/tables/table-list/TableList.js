import React, { useState, useEffect } from "react"

import TableCard from "../table-card/TableCard"

// import list tables from utils/api

export default function TableList({ reservations, date }) {

  const [tableList, setTableList] = useState([])
  const [reservationsError, setReservationsError] = useState(null)

  // useEffect(() => {
  //   const abortController = new AbortController()
  //   listTables({ date }, abortController.signal)
  //     .then(setTableList)
  //     .catch(setReservationsError)
  //   return () => abortController.abort()
  // }, [date])

  if (!tableList) {
    return null
    // make loading screen  component
  }

  return (
    <>
      {tableList.map((table) => (
        <TableCard
          key={table.reservation_id}
          reservation={table}
        />
      ))}
    </>
  )
}