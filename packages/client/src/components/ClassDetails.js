import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

export default function Class({ cls }) {
  const [teacher, setTeacher] = useState('');

  useEffect(async function getTeacher() {
    const teacher = await (await axios.get(`http://localhost:3001/users/${cls.teacher}`)).data;
    setTeacher(teacher.firstName + ' ' + teacher.lastName);
  }, []);

  return (
    <Card>
      <Card.Header className='name'>
        {cls.name}
      </Card.Header>
      <Card.Body>Teacher: {teacher}</Card.Body>
    </Card>
  )
}
