import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";

import "./App.css";

function App() {
  return (
    <Container id="app" fluid>
      <BrowserRouter>
        <Container id="header" fluid>
          <Row>
            <Header/>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col id="sidebar" xs={3}>
              <Sidebar/>
            </Col>
            <Col id= "main" xs={9}>
              <Main/>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </Container>
  );
}

export default App;
