import React, { useState, useEffect } from 'react';
import { Container, Button, ListGroup, Row, Col, Card, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import AssignmentList from './AssignmentList.js';
import ClassList from './ClassList.js';
import ClassDetails from './ClassDetails.js';
import axios from 'axios';

export default function Dashboard({ user }) {
	const [cls, setCls] = useState([]);
	const [keys, setKeys] = useState(user.classIds);
	const [clsShow, setClsShow] = useState(false);
	const [assignmentShow, setAssignmentShow] = useState(false);
	const [form, setForm] = useState('');

	let getDashboard = async () => {
		//
		try {
			const classes = await axios.get(`http://localhost:3001/classes/`,{
				params: keys
			})
			setCls(classes.data)
		} catch (err) {
			console.error(err);
		}
	};

	const goToDetails = (c) => {
		return <ClassDetails cls={c} />
	}

	const handleInputChange = (event) => {
		setForm(event.target.value)
	}

	const toggleAddClass = async () => {
		setClsShow(!clsShow)
	}

	const toggleAddAssignment = async () => {
		setAssignmentShow(!assignmentShow)
	}

	const addClass = async (e) => {
		e.preventDefault();
		console.log(form)

		await axios.post('http://localhost:3001/classes/', {
			name: form,
			teacher: user._id, 
		})

		await axios.patch(`http://localhost:3001/users/${user._id}`)
	}

	const addAssignment = async (e) => {
		e.preventDefault();
		console.log(e.target.value)

	}

	useEffect(() => {
		getDashboard();
	}, []);
	
	return (
		<div>
			<Container className="dashPage">
				<Row id="dash">
					<Col>
					{user.type === 'student' && (
							<ListGroup id="assignmentList">
								<h2>Assignment List</h2>
								{cls.map((cl, i) => <AssignmentList props={cl} key={i} />)}
							</ListGroup>
					)}
					</Col>

					{user.type === 'teacher' && (
					<Col>
						<Card>
							<h2 className='heading'>Classes</h2> <Button id='add-class' onClick={toggleAddClass}>Add a Class</Button>
							<Modal show={clsShow} onHide={toggleAddClass}>
								<Modal.Header closeButton={toggleAddClass}>
									Create a Class:
								</Modal.Header>
								<Modal.Body>
									<Form id='create-class' onSubmit={addClass}>
										<Form.Group>
											<Form.Label>Class Name</Form.Label>
											<Form.Control 
												type='text' 
												placeholder="Enter a class name..."
												onChange={handleInputChange}/>
										</Form.Group>
										
									<Button variant="primary" type='submit'>
										Save Class
									</Button>
									</Form>
								</Modal.Body>
								<Modal.Footer>
									<Button variant="danger" onClick={toggleAddClass}>
										Discard Changes
									</Button>
								</Modal.Footer>
							</Modal>
							<Card.Body>
								<ListGroup className='teacher-classes'>
									{
										cls.map((c) => {
											return (
												<ListGroup.Item className='class' key={c._id}>
													<Link to={
														{
															pathname:`/class-detail/${c._id}`,
															classId: c._id,
														}
													}>Class: {c.name}</Link>
													{console.log(c.students)}
													<Card.Text>Students: {c.students.length}</Card.Text>
													<Card.Text>Assignments: {c.assignments.length}</Card.Text>
												</ListGroup.Item>
										)})
									}
									</ListGroup>	
							</Card.Body>
						</Card>
					</Col>
					)}

					{user.type === 'teacher' && (

					<Col>
						<Card>
							<h2 className='heading'>Assignments</h2> <Button id='add-assignment' onClick={toggleAddAssignment}>Add an Assignment</Button>
							<Modal show={assignmentShow} onHide={toggleAddAssignment}>
								<Modal.Header closeButton={toggleAddAssignment}>
									Create a Assignment:
								</Modal.Header>
								<Modal.Body>
									<Form id='create-assignment'>
										<Form.Group>
											<Form.Label>Class</Form.Label>
											<Form.Control type='name' placeholder="Enter class name"></Form.Control>
										</Form.Group>

										<Form.Group>
											<Form.Label>Assignment Name</Form.Label>
											<Form.Control type='name' placeholder="Enter assignment name"></Form.Control>
										</Form.Group>


										<Form.Group>
											<Form.Label>Link</Form.Label>
											<Form.Control type='name' placeholder="Link to assignment"></Form.Control>
										</Form.Group>

										<Form.Group>
											<Form.Label>Directions</Form.Label>
											<Form.Control type='name' placeholder="Student instructions"></Form.Control>
										</Form.Group>
									</Form>
								</Modal.Body>
								<Modal.Footer>
									<Button variant="danger" onClick={toggleAddAssignment}>
										Discard Changes
									</Button>
									<Button variant="primary">
										Save Changes
									</Button>
								</Modal.Footer>
							</Modal>
							<Card.Body className='teacher-assignments'>
									{
										cls.map((c,i)=>{
											return <AssignmentList cls={c} key={i}/>
										})
									}
							</Card.Body>
						</Card>
					</Col>
					)}
				</Row>
			</Container>
		</div>
	);
}
