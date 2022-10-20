import React from "react"

import { Redirect, Route, Switch } from "react-router-dom"
import Dashboard from "../dashboard/Dashboard"
import NotFound from "./NotFound"

import { today } from "../utils/date-time"
import { DateTime } from "luxon"

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {

  // implement date here
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path={["/reservations", "/tables", "/dashboard"]}>
        <Dashboard className="bg-secondary text-white" />
      </Route>
      <Route exact={true} path="/search">
        {/* <Search /> */}
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default Routes
