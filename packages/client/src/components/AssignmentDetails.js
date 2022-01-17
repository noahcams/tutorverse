import React from 'react'
import { Card } from 'react-bootstrap'

export default function AssignmentDetail({ assignment }) {
  let created = new Date(assignment.createdAt)
  let date = `${created.getMonth()+1}-${created.getDate()}-${created.getFullYear()}`
  return (
      <Card className="assignment">
          <Card.Header>{assignment.name}</Card.Header>
          <Card.Body>
            <Card.Subtitle>Created: {date}</Card.Subtitle>
            <a href={assignment.link} target="_blank">Link</a>
            <Card.Text>Directions: {assignment.text}</Card.Text>
          </Card.Body>
      </Card>
  )
}
