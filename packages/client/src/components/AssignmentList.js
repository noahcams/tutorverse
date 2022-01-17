import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AssignmentDetail from './AssignmentDetails.js'

export default function AssignmentList({ user, cls }) {
  const [assignmentIds] = useState(cls.assignments)
  const [assignments,setAssignments] = useState([])
  const [clas, setClas] = useState(cls)
  let getAssignments = async () => {
      clas.assignments.map( async (as)=> {
        const fetched = await axios.get(`http://localhost:3001/assignments/${as}`)
        setAssignments((assignments)=> [...assignments, fetched.data])
      })
  }    

  useEffect(()=> {
    getAssignments()
  },[])

    return (
      <>
        { 
          assignments.map((as) => {
            return <AssignmentDetail assignment={as} key={as._id} />
          })
        }
      </>
    )  
}
