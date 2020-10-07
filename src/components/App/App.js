import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import "./App.css";

function App() {
  return (
    <Container id="app" fluid>
      <BrowserRouter>
        <Container fluid>
          <Row>
            <Col id="sidebar" xs={12} md={3}>
              <Sidebar/>
            </Col>
            <Col id= "main" xs={12} md={9}>
              <Main/>
            </Col>
          </Row>
          <Row id="footer">
            <Footer/>
          </Row>
        </Container>
      </BrowserRouter>
    </Container>
  );
}

export default App;
