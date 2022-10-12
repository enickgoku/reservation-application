import React from "react"
import { useState } from "react"

import Menu from "./Menu"
import Header from "./Header"
import Routes from "./Routes"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { DateTime, Settings } from "luxon"

import "./Layout.css"

 function Layout() {
 
   return (
     <Container fluid className="layout">
       <Row>
         <Col className="d-flex align-items-end">
           <Menu />
         </Col>
       </Row>
       <Row>
         <Col className="d-flex justify-content-center align-items-center p-0">
           <Routes />
         </Col>
       </Row>
     </Container>
    )
  }
 
 export default Layout
