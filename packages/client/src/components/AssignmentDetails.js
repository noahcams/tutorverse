import React, { useState, useEffect } from 'react'
import { 
  ListGroup,
  Card,
  Container

} from 'react-bootstrap'
import axios from 'axios'

export default function AssignmentDetail(props) {

  let assignment = props.props

  console.log(props)
  return (
    <ListGroup.Item className="assignment">
      <Card>
        <Card.Body>
          <Card.Header>{assignment.name}</Card.Header>
          <a href={assignment.link}>Link</a>
          <Card.Text>Directions: {assignment.text}</Card.Text>
        </Card.Body>
      </Card>
    </ListGroup.Item>
  )
}
