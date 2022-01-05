import React, { useState, useEffect } from 'react'
import { 
  ListGroup,
  Card,
  Container

} from 'react-bootstrap'
import axios from 'axios'

export default function AssignmentDetail(props) {

  console.log(props)
  return (
    <ListGroup.Item className="assignment">
      <Card>
        <Card.Body>
          <Card.Header>{props.props.name}</Card.Header>
          <a href='https://www.google.com'>Link</a>
          <Card.Text>Directions: {props.props.text}</Card.Text>
        </Card.Body>
      </Card>
    </ListGroup.Item>
  )
}
