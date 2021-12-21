import React from 'react';
import { Navbar as NavBar, Container, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<NavBar bg="primary" variant="dark">
			<Container>
				<Link className="navbar-brand" to="/">Home</Link>
				<Nav className="me-auto">
					<Link to="/class-list" className="navbar-brand">Classes</Link>
					<Link to="/dashboard" className="navbar-brand">Dashboard</Link>
					<Link to="/student-details" className="navbar-brand">USERNAME</Link>
					{/* if user.type === 'teacher', Link to="/teacher-details" */}
				</Nav>
			</Container>
		</NavBar>
	);
}
