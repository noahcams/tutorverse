import React, { useEffect } from 'react'
import { 
  ListGroup,
  Card,
} from 'react-bootstrap'

export default function StudentDetails({ user }) {
  function calculateAverage(grades) {
    let average = 0
    grades.forEach(g => average += g.grade)
    return average / grades.length
  }
  useEffect(() => {
  },[])
  return (
      <ListGroup.Item className="dashpage">
        <Card>
          <Card.Header>
            {user.username}
          </Card.Header>
          <Card.Body>
              <Card.Text>Overall Grade: {calculateAverage(user.grades).toFixed(2)}</Card.Text>
          </Card.Body>
        </Card> 
      </ListGroup.Item>
  )
}
