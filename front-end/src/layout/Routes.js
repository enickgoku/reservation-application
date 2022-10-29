import React from "react"

import { Redirect, Route, Switch } from "react-router-dom"
import Dashboard from "../dashboard/Dashboard"
import SearchForm from "../search/SearchForm"
import NotFound from "./NotFound"

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes(props) {

  let {
    handleChangeDateSetting,
    currentDate,
    dateSetting,
    setDateSetting,
    currentTime,
    changeDate,
    today
  } = props

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path={["/reservations", "/tables", "/dashboard"]}>
        <Dashboard className="bg-secondary text-white" {...props} />
      </Route>
      <Route exact={true} path="/search">
        <SearchForm />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default Routes
