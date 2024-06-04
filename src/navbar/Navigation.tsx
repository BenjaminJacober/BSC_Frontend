import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Navigation() {
    return <Navbar className="bg-body-tertiary justify-content-between ">
        <Navbar.Collapse className="mx-4" id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link><Link to="/">Home</Link></Nav.Link>
                <Nav.Link><Link to="/user">User</Link></Nav.Link>
                <Nav.Link><Link to="/login">Login</Link></Nav.Link>
                <Nav.Link><Link to="/trip">Trip</Link></Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
}