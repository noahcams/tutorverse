import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AssignmentDetail from './AssignmentDetails.js'

export default function AssignmentList({ cls }) {
  const [assignmentIds] = useState(cls.assignments)
  const [assignments,setAssignments] = useState([])
  
  let getAssignments = async () => {
    if (cls.assignments.length === 1) {
      const fetched = await axios.get(`http://localhost:3001/assignments/${cls.assignments}`)
      setAssignments([fetched.data])
    } else {
      cls.assignments.map( async (as)=> {
        const fetched = await axios.get(`http://localhost:3001/assignments/${as}`)
        setAssignments((assignments)=> [...assignments, fetched.data])
      })
    }
  }    

  useEffect(()=> {
    getAssignments()
  },[])

    return (
      <div>
        { 
          assignments.map((as) => {
            return <AssignmentDetail props={as} key={as._id} />
          })
        }
      </div>
    )  
}
