import React, { useState, useEffect } from "react"

import TableCard from "../table-card/TableCard"
import Loading from "../../loading/Loading"

// import list tables from utils/api
import { listTables } from "../../utils/api"

export default function TableList(props) {

  let {
    tables
  } = props

  if (!tables) {
    return <Loading />
  }

  return (
    <>
      {tables.map((table) => (
        <TableCard
          key={table.table_id}
          tables={tables}
        />
      ))}
    </>
  )
}