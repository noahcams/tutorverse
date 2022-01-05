import React, { useState, useEffect } from 'react'
import { Container,
  Nav,
  Card,
  Button,
  ListGroup,
  Row,
  Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import StudentDetails from './StudentDetails.js'
import TeacherDetails from './TeacherDetails.js'
import AssignmentList from './AssignmentList.js'
import axios from 'axios'


  
export default function Dashboard({ user }) {
  const [cls, setCls] = useState([])
  
  // get classId from URL
  let { id } = useParams()

  let getDashboard = async (id) => {
    try {
      // const holder = await axios.get(`http://localhost:3001/users/${id}`)
      const classes = await axios.get(`http://localhost:3001/classes/${user.classIds}`)
      setCls(classes.data)
    } catch (err) {
      console.log(err)
    }
  }
    useEffect(() => {
      getDashboard(id)
  },[])

  
  return (
    <div>
      <Container className="dashPage">
        <Row id="dashContent">
          {user.type === 'student' &&
            <ListGroup id="assignmentList">
            <h2>Assignment List</h2>
            <AssignmentList props={cls} />
            </ListGroup> 
          }
          <Col id="details">
            { 
              user.type === "student" &&
              <h2>Student Details</h2>
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
