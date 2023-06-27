import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export default function Headers() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <NavLink to='/' className="mx-3 mt-2 text-light text-decoration-none">Home</NavLink>
          <Nav className="">
            <NavLink to='/register' className="mx-3 mt-2 text-light text-decoration-none">Register</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
