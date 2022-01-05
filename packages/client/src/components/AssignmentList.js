import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AssignmentDetail from './AssignmentDetails.js'

export default function AssignmentList(cls) {
  const [assignments,setAssignmnents] = useState([])
  const [keys,setKeys] = useState(cls.props.assignments)
  
  let getAssignments = async () => {
    const fetched = await axios.get(`http://localhost:3001/assignments/`,{
    params: keys
    })
    console.log(fetched.data)
    setAssignmnents(fetched.data)
  }

  useEffect(()=> {
    getAssignments()
  },[])

    return (
      <div>
        {
          assignments.map((assignment) => {
           return <AssignmentDetail props={assignment} key={assignment._id} />
          })
        }
      </div>
    )
  
}
