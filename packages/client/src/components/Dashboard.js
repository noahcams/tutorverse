import React, { useState, useEffect } from 'react';
import { Container, Button, ListGroup, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import StudentDetails from './StudentDetails.js';
import TeacherDetails from './TeacherDetails.js';
import AssignmentList from './AssignmentList.js';
import axios from 'axios';

export default function Dashboard({ user }) {
	const [cls, setCls] = useState([]);

	// get classId from URL
	// This was throwing an error for me. I think the issue is user.classIds is an array. -Noah
	let { id } = useParams();
	let getDashboard = async (id) => {
		//
		try {
			const classes = user.classIds.map(
				async (cl) =>
					await (await axios.get(`http://localhost:3001/classes/${cl}`)).data
			)
			setCls(classes);
			if (user.type === 'teacher') {
				const students = await axios.get(
					`http://localhost:3001/users/${cls.students}`
				);
				console.log(students);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getDashboard(id);
	}, []);

	// console.log(user)
	// console.log(cls.students)

	return (
		<div>
			<Container className="dashPage">
				<Row id="dashContent">
					{user.type === 'student' && (
						<ListGroup id="assignmentList">
							<h2>Assignment List</h2>
							{cls.map((cl, i) => <AssignmentList props={cl} key={i} />)}
						</ListGroup>
					)}

					{user.type === 'teacher' && (
						<ListGroup id="studentList">
							<ListGroup.Item>Hello</ListGroup.Item>
						</ListGroup>
					)}
				</Row>
			</Container>
		</div>
	);
}
