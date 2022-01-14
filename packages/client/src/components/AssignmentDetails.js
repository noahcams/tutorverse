import React, { useState, useEffect } from 'react'
import { 
  ListGroup,
  Card,

} from 'react-bootstrap'

export default function AssignmentDetail(props) {

  let assignment = props.props
  let created = new Date(assignment.createdAt)
  let date = `${created.getMonth()+1}-${created.getDate()}-${created.getFullYear()}`

  return (
    <ListGroup.Item className="assignment">
      <Card>
        <Card.Body>
          <Card.Header>{assignment.name}</Card.Header>
          <Card.Subtitle>Created: {date}</Card.Subtitle>
          <a href={assignment.link} target="_blank">Link</a>
          <Card.Text>Directions: {assignment.text}</Card.Text>
        </Card.Body>
      </Card>
    </ListGroup.Item>
  )
}
