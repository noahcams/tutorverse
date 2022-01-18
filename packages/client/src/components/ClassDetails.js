import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router"
import { Card } from 'react-bootstrap';
import AssignmentDetail from './AssignmentDetails';
import StudentDetails from './StudentDetails';

export default function ClassDetails({user}) {
  const [cls, setCls] = useState({})
  const [assignments,setAssignments] = useState([])
  const [students, setStudents] = useState([])
  const params = useParams()

  const getClassDetail= async() => {
    try {
        const fetched = await axios.get(`http://localhost:3001/classes/${params.id}`)
        setCls(fetched.data)
        if (fetched.data.students.length === 0){
          setStudents([])
        } else {
          fetched.data.students.map(async id => {
            const fetched = await axios.get(`http://localhost:3001/users/${id}`);
            setStudents((students)=> [...students, fetched.data])
          })
          setStudents(students.filter(s => s.type === 'student'))
        }
        fetched.data.assignments.map( async (as)=> {
          const fetched = await axios.get(`http://localhost:3001/assignments/${as}`)
          setAssignments((assignments)=> [...assignments, fetched.data])
        })
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
          <h4>Assignments:</h4> 
          {assignments.map((as) => {
              return <AssignmentDetail assignment={as} key={as._id} />
              })
          }
            <h4>Students:</h4>
          {students.length > 0 &&
            students.map(s => {
              return <StudentDetails user={s} cls={cls} key={s._id}/>
            })
          }
      </Card.Body>
    </Card>
  )
}
