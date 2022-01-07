import React from 'react';
import { Card } from 'react-bootstrap';

export default function Class({ cls }) {
  return (
    <Card>
      <Card.Header>
        {cls.name}
      </Card.Header>
      <Card.Body>Teacher: {cls.teacher}</Card.Body>
    </Card>
  )
}
