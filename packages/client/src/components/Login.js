import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';

export default function Login({ setUser, setLoggedIn}) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await axios.post('http://localhost:3001/auth/signin', { username, password });
			setUser(res.data);
			setIsLoading(false);
			setLoggedIn(true);
			localStorage.setItem('user', JSON.stringify(res.data));
		} catch (error) {
			setIsLoading(false);
			toast.error('Invalid username or password');
			toast.error(error);
		}
	};

	return (
		<div id="loginPage">
			<div className="loginBox">
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
								<Form.Group
									className="user-password"
									controlId="formLogInPassword"
								>
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Password..."
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</Form.Group>
								<Button variant="primary" type="submit">
									{isLoading ? (
										<Oval
											height="20"
											width="20"
											color="white"
											arialLabel="loading"
										/>
									) : (
										'Log In'
									)}
								</Button>
							</Form>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
}
