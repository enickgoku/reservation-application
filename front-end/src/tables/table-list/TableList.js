import React from "react"

import TableCard from "../table-card/TableCard"
import Loading from "../../loading/Loading"
import ErrorAlert from "../../layout/ErrorAlert"
import TableFilter from "../tables-tool-bar/TableFilter"

export default function TableList(props) {

  let {
    tables,
    tablesError,
    setTablesFilter,
    loadDashboard,
  } = props

  if (!tables) {
    return <Loading />
  }

  return (
    <>
      <TableFilter setTablesFilter={setTablesFilter} />
      <ErrorAlert error={tablesError} />
      {tables.map((table) => (
        <TableCard
          key={table.table_id}
          table={table}
          loadDashboard={loadDashboard}
        />
      ))}
    </>
  )
}
