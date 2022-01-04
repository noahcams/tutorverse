import React, { useState, useEffect } from 'react'
import { 
  ListGroup,
  Card,
  Container

} from 'react-bootstrap'
import axios from 'axios'

export default async function AssignmentDetails(props) {
  // const [user, setUser] = useState(props)

  return (
    <Container>
      <ListGroup>
        <ListGroup.Item className="assignment">
          <Card>
            <Card.Body>
              <Card.Header>Math Homework 1</Card.Header>
              <Card.Subtitle>{props.text}</Card.Subtitle>
              
              <Card.Text>Grade: {user.grades}</Card.Text>
              <Card.Text>Class: {user.className}</Card.Text>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  )
}
