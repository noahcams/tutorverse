import React, { useState, useEffect } from 'react'
import { 
  ListGroup,
  Card,
  Container,
} from 'react-bootstrap'
import axios from 'axios'

export default function StudentDetails({ user }) {

  function calculateAverage(grades) {
    let average = 0
    grades.forEach(g => average += g.grade)
    return average / grades.length
  }

  let getDetails = async (id) => {
    // try {
    //   const classes = await axios.get(`http://localhost:3001/classes/${user.classIds}`)
    //   setCls(classes.data)
    //   const teach = await axios.get(`http://localhost:3001/users/${classes.data.teacher}`)
    //   setTeacher(teach.data)
    // } catch (err) {
    //   console.log(err)
    // }
  }

  useEffect(() => {
    // getDetails(user._id)
  },[])

  return (
      <ListGroup.Item className="dashpage">
        <Card>
          <Card.Header>
            {user.username}
          </Card.Header>
          <Card.Body>
            <Card.Text>Overall Grade: {calculateAverage(user.grades).toFixed(2)}</Card.Text>
          </Card.Body>
        </Card> 
      </ListGroup.Item>
  )
}
