import React, { useState, useEffect } from 'react'
import { Container,
  Button,
  ListGroup,
  Row,
  Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import StudentDetails from './StudentDetails.js'
import TeacherDetails from './TeacherDetails.js'
import AssignmentList from './AssignmentList.js'
import axios from 'axios'

<<<<<<< HEAD

  
=======
>>>>>>> 98549cc (teacher login/dashboard progress; student details with class)
export default function Dashboard({ user }) {
  const [cls, setCls] = useState([])
  
  // get classId from URL
  let { id } = useParams()
  let getDashboard = async (id) => {
    try {
<<<<<<< HEAD
      // const holder = await axios.get(`http://localhost:3001/users/${id}`)
      const classes = await axios.get(`http://localhost:3001/classes/${user.classIds}`)
=======
      const classes = await axios.get(`http://localhost:3001/classes/${user.classId}`)
>>>>>>> 98549cc (teacher login/dashboard progress; student details with class)
      setCls(classes.data)
      if(user.type === "teacher"){
        const students = await axios.get(`http://localhost:3001/users/${cls.students}`)
        console.log (students)
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
      getDashboard(id)
  },[])

  console.log(user)
  console.log(cls.students)

  
  return (
    <div>
      <Container className="dashPage">
        <Row id="dashContent">

          {
          user.type === 'student' &&
            <ListGroup id="assignmentList">
            <h2>Assignment List</h2>
            <AssignmentList props={cls} />
            </ListGroup> 
          }

          {
          user.type === 'teacher' &&
            <ListGroup id='studentList'>
              <ListGroup.Item>Hello</ListGroup.Item>
            </ListGroup>
          }
        </Row>
    </Container>
    </div>
  )
}
