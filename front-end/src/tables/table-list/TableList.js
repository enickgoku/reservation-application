import React, { useState, useEffect } from "react"

import TableCard from "../table-card/TableCard"
import Loading from "../../loading/Loading"

// import list tables from utils/api
import { listTables } from "../../utils/api"

export default function TableList({ reservations, date }) {

  const [tableList, setTableList] = useState([])
  const [reservationsError, setReservationsError] = useState(null)

  useEffect(() => {
    const abortController = new AbortController()
    listTables({ date }, abortController.signal)
      .then(setTableList)
      .catch(setReservationsError)
    return () => abortController.abort()
  }, [date])

  if (!tableList) {
    return <Loading />
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