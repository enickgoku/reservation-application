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
     <Container fluid className="layout bg-secondary text-white">
       <Row className="bg-secondary text-white">
         <Col className="d-flex align-items-end bg-secondary text-white">
           <Menu />
         </Col>
       </Row>
       <Row className="bg-secondary text-white">
         <Col className="d-flex justify-content-center align-items-center bg-secondary text-white p-0">
           <Routes />
         </Col>
       </Row>
     </Container>
    )
  }
 
 export default Layout
