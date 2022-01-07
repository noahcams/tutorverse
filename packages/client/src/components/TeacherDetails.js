import React from 'react'
import { 
  ListGroup,
  Card,
  Container,
  Row,
  Col

} from 'react-bootstrap'
import axios from 'axios'

export default function TeacherDetails({ teacher }) {
  return (
      <Container>
            <Card>
              <Card.Body>
                <Card.Header><b>Name</b>: {teacher.username}</Card.Header>
                <Card.Subtitle>Email: {teacher.email}</Card.Subtitle>
              </Card.Body>
            </Card>
      </Container>
  )
}
