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
            {/* <p>{user?.email}</p> */}
          </Nav>
          <div style={{textAlign:"center"}}>
          <i class="fa-solid fa-user"></i>
          <NavDropdown title="" id="basic-nav-dropdown" align="end" style={{display:"inline-block"}}>
            <NavDropdown.Item href="#action/3.1">View Profile</NavDropdown.Item>
            {/* <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
            <NavDropdown.Divider />
            <NavDropdown.Item href="/">
              <button onClick={logoutApi} style={{backgroundColor:"transparent", border:"none"}}> Logout </button>
            </NavDropdown.Item>
          </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
