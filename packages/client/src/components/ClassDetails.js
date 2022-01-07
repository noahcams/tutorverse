import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

export default function Class({ cls }) {
  const [teacher, setTeacher] = useState('');

  useEffect(async function getTeacher() {
    console.log("Teacher ID: " + cls.teacher);
    const teacher = await (await axios.get(`http://localhost:3001/users/${cls.teacher}`)).data;
    console.log('TEACHER: ' + JSON.stringify(teacher));
    setTeacher(teacher.firstName + ' ' + teacher.lastName);
  }, []);

  return (
    <Card>
      <Card.Header>
        {cls.name}
      </Card.Header>
      <Card.Body>Teacher: {teacher}</Card.Body>
    </Card>
  )
}
