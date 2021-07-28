import React from 'react'

import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import { NavDropdown, Navbar, Nav, Container } from 'react-bootstrap'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}))


export default function Header() {
	const classes = useStyles();
	return (
		<Navbar bg="light" expand="lg">
		  <Container>
		 
		    	<Link to="/" className="navbar-brand">
		    		Ermia's Blog
		    	</Link>
		      	

		    <Navbar.Toggle aria-controls="basic-navbar-nav" />
		    <Navbar.Collapse id="basic-navbar-nav">
		      <Nav className="me-auto">
		      <Link to="/cards" className="nav-link">Cards</Link>
		        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
		          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
		          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
		          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
		          <NavDropdown.Divider />
		          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
		        </NavDropdown>
		      </Nav>
		      <Nav>
		      
		      <Link to="/login" className="nav-link">
		      	Login
		      </Link>
		      </Nav>
		    </Navbar.Collapse>
		  </Container>
		</Navbar>
	)
}