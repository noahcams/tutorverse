import React from 'react';
import { Card } from 'react-bootstrap';

export default function Class({ cls }) {
  //get teacher's name or change model to use teacher string rather than object id...

  return (
    <Card>
      <Card.Header>
        {cls.name}
      </Card.Header>
      <Card.Body>Teacher: {cls.teacher}</Card.Body>
    </Card>
  )
}
