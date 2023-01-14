import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import { Navbar, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../assets/img/icons/logo2.png";
const Header = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <Navbar
            collapseOnSelect={true}
            variant="dark"
            expand="sm"
            fixed="top"
            className="justify-content-center custom_navbar"
          >
            <div className="col-md-8">
              <Container fluid="md">
                <Navbar.Brand className="justify-content-center">
                  <NavLink
                    to="/"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      marginLeft: "3%",
                    }}
                    as={NavLink}
                    eventKey="1"
                  >
                    <b style={{ fontSize: 24 }}>VirBioHub</b>
                  </NavLink>
                </Navbar.Brand>
              </Container>
            </div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Navbar.Brand>
                  <Nav.Link
                    to="/"
                    className="nav-link navItem"
                    style={{ color: "white" }}
                    as={NavLink}
                    eventKey="1"
                  >
                    Home
                  </Nav.Link>
                </Navbar.Brand>

                <NavDropdown
                  title="Resources"
                  id="basic-nav-dropdown"
                  className="nav-link navItem"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/viruses-and-hosts-launcher"
                    eventKey="3"
                  >
                    <p className="dropdown-item" style={{ width: "100%" }}>
                      Catalog of Viruses and Hosts
                    </p>
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/ppi-predictor-intro"
                    eventKey="4"
                  >
                    <p className="dropdown-item" style={{ width: "100%" }}>
                      Virus-Host PPI Predictor
                    </p>
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/viral-infection-predictor-intro"
                    eventKey="5"
                  >
                    <p className="dropdown-item" style={{ width: "100%" }}>
                      Viral Infection Predictor
                    </p>
                  </NavDropdown.Item>
                </NavDropdown>
                <Navbar.Brand>
                  <Nav.Link
                    className="nav-link navItem"
                    to="/team"
                    as={NavLink}
                    style={{
                      color: "white",
                    }}
                    eventKey="2"
                  >
                    Our Team
                  </Nav.Link>
                </Navbar.Brand>
                <Navbar.Brand>
                  <Nav.Link
                    className="nav-link"
                    to="/publications"
                    style={{ color: "white", marginRight: "4%" }}
                    as={NavLink}
                    eventKey="6"
                  >
                    Publications
                  </Nav.Link>
                </Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <br />
        </div>
      </div>
    </>
  );
};

export default Header;
