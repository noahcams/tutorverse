import React, { useState, useEffect } from 'react'
import { 
  ListGroup,
  Card,
  Container,
  Row,
  Col

} from 'react-bootstrap'
import axios from 'axios'
import TeacherDetails from './TeacherDetails.js'

export default function StudentDetails({ user }) {
  const [cls, setCls] = useState([])
  const [teacher, setTeacher] = useState({})

  function calculateAverage(grades) {
    let average = 0
    grades.forEach(g => average += g.grade)
    return average / grades.length
  }

  let getDetails = async (id) => {
    try {
      const classes = await axios.get(`http://localhost:3001/classes/${user.classIds}`)
      setCls(classes.data)
      const teach = await axios.get(`http://localhost:3001/users/${classes.data.teacher}`)
      setTeacher(teach.data)
    } catch (err) {
      console.log(err)
    }
  }

  let handleTeacherDetails = (teacher) => <TeacherDetails teacher={teacher} />

  useEffect(() => {
    getDetails(user._id)
  },[])

  return (
    <div>
      <Container className="dashpage">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Header onClick={() => {}}>Classes: {cls.name}</Card.Header>
                <Card.Subtitle>Teacher: {teacher.username}</Card.Subtitle>
                <Card.Text>Overall Grade: {calculateAverage(user.grades)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <TeacherDetails teacher={teacher} />
          </Col>
        </Row>      
      </Container>
    </div>
  )
}
