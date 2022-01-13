import React, { useState, useEffect } from 'react';
import { Container, Button, ListGroup, Row, Col, Card, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import AssignmentList from './AssignmentList.js';
import ClassList from './ClassList.js';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialNewAssignment = {
	className: '',
	assignmentName: '',
	link: '',
	instructions: ''
};

export default function Dashboard({ user }) {
	const [cls, setCls] = useState([]);
	const [keys, setKeys] = useState(user.classIds);
	const [clsShow, setClsShow] = useState(false);
	const [assignmentShow, setAssignmentShow] = useState(false);
	const [form, setForm] = useState('');
	const [newAssignment, setNewAssignment] = useState(initialNewAssignment);

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

	const handleClassName = (e) => setNewAssignment({...newAssignment, className: e.target.value });

	const handleAssignmentName = (e) => setNewAssignment({...newAssignment, assignmentName: e.target.value });

	const handleLink = (e) => setNewAssignment({...newAssignment, link: e.target.value });

	const handleInstructions = (e) => setNewAssignment({...newAssignment, instructions: e.target.value });

	const handleAddAssignment = async () => {
		const { assignmentName, instructions, link } = newAssignment;
		try {
			await axios.post('http://localhost:3001/assignments/', {
				"name": assignmentName,
				"text": instructions,
				"link": link
			});
			toast.success("Assignment added!");
		} catch(err) {
			toast.error(err.message);
			console.error(err);
		}
		toggleAddAssignment();
	};

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

	const log = () => {

		return <Link to='/class-detail' />
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
													<Link to='/class-detail' cls={c} key={c._id}>Class: {c.name}</Link>
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
									Create an Assignment:
								</Modal.Header>
								<Modal.Body>
									<Form id='create-assignment'>
										<Form.Group>
											<Form.Label>Class</Form.Label>
											<Form.Control type='name' value={newAssignment.className} placeholder="Enter class name" onChange={handleClassName}></Form.Control>
										</Form.Group>

										<Form.Group>
											<Form.Label>Assignment Name</Form.Label>
											<Form.Control type='name' value={newAssignment.assignmentName} placeholder="Enter assignment name" onChange={handleAssignmentName}></Form.Control>
										</Form.Group>


										<Form.Group>
											<Form.Label>Link</Form.Label>
											<Form.Control type='name' value={newAssignment.link} placeholder="Link to assignment" onChange={handleLink}></Form.Control>
										</Form.Group>

										<Form.Group>
											<Form.Label>Directions</Form.Label>
											<Form.Control type='name' value={newAssignment.instructions} placeholder="Student instructions" onChange={handleInstructions}></Form.Control>
										</Form.Group>
									</Form>
								</Modal.Body>
								<Modal.Footer>
									<Button variant="danger" onClick={toggleAddAssignment}>
										Discard Changes
									</Button>
									<Button variant="primary" onClick={handleAddAssignment}>
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
