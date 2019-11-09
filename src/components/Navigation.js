import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Navigation(props) {
    return (
        <Navbar bg='light' expand="lg">
            <Link to="/">
                <Navbar.Brand href="#home">Find your repos</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/">
                        <Nav.Link href="#home">Home</Nav.Link>
                    </Link>
                    <Link to="/favor">
                        <Nav.Link href="#link">Favorites</Nav.Link>
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;

// class DarkButton extends React {
//     static contextType = ThemeContext;
//     render () {
//         <Button variant={this.context}>Remove from favorites</Button>
//     }
// }

// export default DarkButton;