import axios from 'axios';
import React from 'react';
import { Card } from 'react-bootstrap';

export default function Class({ cls }) {
  //get teacher's name or change model to use teacher string rather than object id...
  // (async function getTeacher() {
  //   console.log("Teacher ID: " + cls.teacher);
  //   const teacher = await axios.get(`http://localhost:3001/users/${cls.teacher}`);
  // })();

  return (
    <Card>
      <Card.Header>
        {cls.name}
      </Card.Header>
      <Card.Body>Teacher: {cls.teacher}</Card.Body>
    </Card>
  )
}
