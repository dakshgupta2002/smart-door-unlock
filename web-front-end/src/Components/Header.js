import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { auth } from "../firebase";
import { logoutApi } from '../Api/Users'
import { useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Header() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  auth.onAuthStateChanged((user) => {
    if (user) setUser(user);
  })

  return (
    <Navbar expand="lg" id="topNav" variant="dark">
      <Container>
        <i className="fa-sharp fa-solid fa-house-lock"></i>
        <Navbar.Brand href="/" style={{ color: "white" }}> Smart-Door-Lock</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <button onClick={() => navigate("/groups")} style={{backgroundColor:"transparent", color:"aliceblue", border:"none"}}> View Groups </button>
            <button onClick={() => navigate("/createGroup")} style={{backgroundColor:"transparent", color:"aliceblue", border:"none"}}> Create Group </button>
            <button onClick={() => navigate("/joinGroup")} style={{backgroundColor:"transparent", color:"aliceblue", border:"none"}}> Join Group </button>
            <button onClick={logoutApi} style={{backgroundColor:"transparent", color:"aliceblue", border:"none"}}> Logout </button>
            <p>{user?.email}</p>
          </Nav>
          {/* <i class="fa-solid fa-user"></i>
          <NavDropdown title="" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
