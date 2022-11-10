import React from "react"
import { useRouteMatch } from "react-router-dom"

import CreateTableForm from "../tables/forms/CreateTableForm"
import EditTableForm from "../tables/forms/EditTableForm"

export default function FormTables(props) {

  const createRoute = useRouteMatch("/tables/new")
  const editRoute = useRouteMatch("/tables/:table_id/edit")

  return (
    <>
      {createRoute ? <CreateTableForm {...props} /> : null}
      {editRoute ? <EditTableForm {...props} /> : null}
    </>
  )
}
