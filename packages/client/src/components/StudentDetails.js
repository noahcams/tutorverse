import React, { useEffect } from 'react'
import { 
  ListGroup,
  Card,
} from 'react-bootstrap'
import { calculateAverage } from '../utils/helpers.js'


export default function StudentDetails({ user }) {
  useEffect(() => {
  },[])
  return (
      <ListGroup.Item className="dashpage">
        <Card>
          <Card.Header>
            {user.username}
          </Card.Header>
          <Card.Body>
              <Card.Text>Overall Grade: {calculateAverage(user.grades).toFixed(2)}%</Card.Text>
          </Card.Body>
        </Card> 
      </ListGroup.Item>
  )
}
