import React, { useState, useEffect } from 'react';
import { Container, Button, ListGroup, Row, Col, Card, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import AssignmentList from './AssignmentList.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';

const initialNewAssignment = {
	className: '',
	assignmentName: '',
	link: '',
	instructions: ''
};

export default function Dashboard({ user, cls, setCls }) {
	const [keys] = useState(user.classIds);
	const [clsShow, setClsShow] = useState(false);
	const [assignmentShow, setAssignmentShow] = useState(false);
	const [form, setForm] = useState('');
	const [newAssignment, setNewAssignment] = useState(initialNewAssignment);
	const [isLoading, setIsLoading] = useState(false);

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
			setIsLoading(true);
			await axios.post('http://localhost:3001/assignments/', {
				"name": assignmentName,
				"text": instructions,
				"link": link
			});

			await axios.patch('http://localhost:3001/classes', { 
				name: newAssignment.className,
				assignment: assignmentName,
			})
			setIsLoading(false);
			toast.success("Assignment added!");
		} catch(err) {
			setIsLoading(false);
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
		// Clearing fields
		setNewAssignment(initialNewAssignment);
		setAssignmentShow(!assignmentShow)
	}

	const addClass = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true)
			await axios.post('http://localhost:3001/classes/', {
				name: form,
				teacher: user._id, 
			})
			await axios.patch(`http://localhost:3001/users/${user._id}`)
			setIsLoading(false)
			toast.success('Class created!')
			toggleAddClass()
		} catch (err) {
			setIsLoading(false)
			toast.error('Error adding class')
			console.error('Adding class error: ', err.message)
		}
	}

	useEffect(() => {
		getDashboard();
	}, []);
	
	return (
		<div>
			<Container className="dashPage">
				<Row id="dash">
					{user.type === 'student' && (
					<Col>
							<div id="assignmentList">
								<h2>Assignment List</h2>
								{cls.map((cl, i) => {
									if (cl.assignments.length > 0){
										return <AssignmentList cls={cl} key={i} />
									}
								})}
							</div>
					</Col>
					)}

					{user.type === 'teacher' && (
					<Col>
						<Card>
							<h2 className='heading'>Classes</h2> <Button id='add-class' onClick={toggleAddClass}>Add a Class</Button>
							<Modal show={clsShow} onHide={toggleAddClass}>
								<Modal.Header closeButton={toggleAddClass}>
									Create a Class:
								</Modal.Header>
								<Modal.Body>
									<Form id='create-class'>
										<Form.Group>
											<Form.Label>Class Name</Form.Label>
											<Form.Control 
												type='text' 
												placeholder="Enter a class name..."
												onChange={handleInputChange}/>
										</Form.Group>
										
									</Form>
								</Modal.Body>
								<Modal.Footer>
									<Button variant="primary" onClick={addClass}>
									{isLoading ? (
										<Oval
											height="20"
											width="20"
											color="white"
											arialLabel="loading"
										/>
									) : (
										'Save Class'
									)}
									</Button>
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
												<Card className="class" key={c._id}>
													<Card.Header>
														<Link
															to={{
																pathname: `/class-detail/${c._id}`,
															}}
														>
															Class: {c.name}
														</Link>
													</Card.Header>
													<Card.Body>
														Students: {c.students.length}<br/>
														Assignments: {c.assignments.length}
													</Card.Body>
													</Card>
											);})
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
										{isLoading ? (
										<Oval
											height="20"
											width="20"
											color="white"
											arialLabel="loading"
										/>
									) : 'Save Changes'}
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
