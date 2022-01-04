import React, { useState, useEffect } from 'react'
import { Container,
  Nav,
  Card,
  Button,
  ListGroup,
  Row,
  Col } from 'react-bootstrap'
  import StudentDetails from './StudentDetails.js'
  import TeacherDetails from './TeacherDetails.js'

export default function Dashboard(props) {
  const [user, setUser] = useState(props)
  // get classId from student and use Id to get class and assignments


  
  return (
    <div>
      <Container className="dashPage">
        <Row id="dashContent">
          <ListGroup id="assignmentList">
            <h2>Assignment List</h2>
            <ListGroup.Item className="assignment">
              <Card>
                <Card.Body>
                  <Card.Title>Math Homework 1</Card.Title>
                  <Card.Text>Grade: {user.grades}</Card.Text>
                  <Card.Text>Class: {user.className}</Card.Text>
                </Card.Body>
              </Card>
            </ListGroup.Item>
            {/* <ListGroup.Item className="assignment">
              <div className="assignmentName">
              Assignment 2 Name
              </div>
              <div className="assignmentGrade">
              Grade
              </div>
              <div className="assignmentClass">
              Class
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="assignment">
              <div className="assignmentName">
              Assignment 3 Name
              </div>
              <div className="assignmentGrade">
              Grade
              </div>
              <div className="assignmentClass">
              Class
              </div>
            </ListGroup.Item> */}
          </ListGroup>
          <Col id="details">
            { 
              user.type === "student" &&
              <StudentDetails student={user}/>
            }
            { 
              user.type === "teacher" &&
              <TeacherDetails teacher={user}/>
            }
          </Col>

        </Row>
    </Container>
    </div>
  )
}
