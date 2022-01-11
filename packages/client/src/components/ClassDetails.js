import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

export default function Class({ cls }) {
  const [assignments, setAssignments] = useState(cls.assignments)
  const [students, setStudents] = useState(cls.students)

  const getClassDetail= async() => {
    const teacher = await (await axios.get(`http://localhost:3001/users/${cls.teacher}`)).data;
    console.log(teacher);
  }

  useEffect(() => {
    console.log(cls)
  }, []);

  return (
    <Card>
      <Card.Header className='name'>
        {cls.name}
      </Card.Header>
      {/* <Card.Body>Teacher: {cls.teacher}</Card.Body> */}
    </Card>
  )
}
