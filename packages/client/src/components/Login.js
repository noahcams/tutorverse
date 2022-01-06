import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

<<<<<<< HEAD
export default function Login({ setUser, setLoggedIn }) {
=======
export default function Login({ setUser, setLoggedIn}) {
>>>>>>> 98549cc (teacher login/dashboard progress; student details with class)
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:3001/auth/signin', { username, password });
<<<<<<< HEAD
			setUser(res.data);
			setLoggedIn(true);
=======
			setUser(res.data)
			setLoggedIn(true)
>>>>>>> 98549cc (teacher login/dashboard progress; student details with class)
		} catch (error) {
			console.error(error);
			console.log(username, password);
			toast.error('Invalid username or password');
		}
	};

	return (
		<Container className="login">
			<h1>Tutorverse</h1>
			<h5>Where Learning Transpires!</h5>
			<Row>
				<Col className="first" md={{ span: 4, offset: 4 }}>
					<Form onSubmit={handleLogin}>
						<Form.Group className="username" controlId="formLogInUsername">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								placeholder="Username..."
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="user-password" controlId="formLogInPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password..."
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Log In
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
