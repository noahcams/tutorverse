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
        const clas = await axios.get(`http://localhost:3001/classes/${params.id}`)
        setCls(clas.data)

        // if there are students, grab them, otherwise mark as empty array
        if (clas.data.students.length === 0){
          setStudents([])
        } else {
          
          const studentList = await axios.get(`http://localhost:3001/users/`,{
            params: clas.data.students
          })
          setStudents(studentList.data.filter(student => student.type === 'student'))
        }

		} catch (err) {
      console.error(err);
		}
  }
  
  useEffect(() => {
    getClassDetail()
  }, []);

  console.log(cls.assignments)
  
  return (
    <Card>
      <Card.Header className='name'>
        {cls.name}
      </Card.Header>
      <Card.Body>
        <ListGroup>
          <h4>Assignments:</h4>
          <AssignmentList cls={cls} />
        </ListGroup>
      <ListGroup>
        <h4>Students:</h4>
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
