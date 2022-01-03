import React, { useState, useEffect } from 'react'
import { Container,
  Nav,
  Card,
  Button,
  Row,
  Col } from 'react-bootstrap'

export default function Dashboard() {
  return (
    <div>
      <Container className="dashPage">
        <Nav id="topNavbar">
          <img alt='Tutorverse Logo' src="tutor-verse/packages/client/public/logo.png"/>
          <a href="http://localhost:3000/#/dashboard">Dashboard</a>
        </Nav>
      <div id="dashContent">
        <div id="assignmentList">
          Assignment List
          <div className="assignment">
            <div className="assignmentName">
            Assignment 1 Name
            </div>
            <div className="assignmentGrade">
            Grade
            </div>
            <div className="assignmentClass">
            Class
            </div>
          </div>
        <div className="assignment">
            <div className="assignmentName">
            Assignment 2 Name
            </div>
            <div className="assignmentGrade">
            Grade
            </div>
            <div className="assignmentClass">
            Class
            </div>
          </div>
        <div className="assignment">
            <div className="assignmentName">
            Assignment 3 Name
            </div>
            <div className="assignmentGrade">
            Grade
            </div>
            <div className="assignmentClass">
            Class
            </div>
          </div>
        </div>
        <div id="details">
          <div className="studentDetail">
            Student Details
          </div>
          <div className="teacherDetail">
            Teacher Details
          </div>
        </div>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>
    </Container>
    </div>
  )
}
