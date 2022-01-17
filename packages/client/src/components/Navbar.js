import React from 'react';
import { Navbar as NavBar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Navbar({ loggedIn, setLoggedIn, user }) {
	return (
		<NavBar bg="primary" variant="dark" className="navbar">
			<Container>
				<Link className="navbar-brand" id="logo" to="/">
					<img src="logo.png" alt="logo" />
				</Link>
				<Nav>
					{loggedIn && (
						<Container className="navbar-links">
							<Link to="/class-list" className="navbar-brand">
								Classes
							</Link>
							<Link to="/" className="navbar-brand logout" onClick={() => {
								setLoggedIn(false);
								localStorage.clear();
								}}>
								Log out
							</Link>
						</Container>
					)}
				</Nav>
			</Container>
		</NavBar>
	);
}
