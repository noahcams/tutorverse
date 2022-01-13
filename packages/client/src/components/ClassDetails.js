import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router"
import { Card, ListGroup } from 'react-bootstrap';
import AssignmentList from './AssignmentList';
import StudentDetails from './StudentDetails';

export default function ClassDetails({ c, user }) {
  const [cls, setCls] = useState({})
  const [students, setStudents] = useState([])
  const params = useParams()
  
  const getClassDetail= async() => {
    try {
      if (!c) {
        const clas = await axios.get(`http://localhost:3001/classes/${params.id}`)
        setCls(clas.data)
        console.log(clas.data.students.length)
        if (clas.data.students.length === 0){
          setStudents([])
        } else {

          const studentList = await axios.get(`http://localhost:3001/users/`,{
            params: clas.data.students
          })
          setStudents(studentList.data.filter(student => student.type === 'student'))
        }
      } else {
        setCls(c)
      }
		} catch (err) {
      console.error(err);
		}
  }

  useEffect(() => {
      getClassDetail()
    }, []);
  
  return (
    <Card>
      <Card.Header className='name'>
        {cls.name}
      </Card.Header>
      <Card.Body>
      <ListGroup>
        { students.length > 0 &&
          students.map(s => {
            return (
              
              <StudentDetails user={s} key={s._id}/>
            )
          })
        }
      </ListGroup>
      </Card.Body>
    </Card>
  )
}
