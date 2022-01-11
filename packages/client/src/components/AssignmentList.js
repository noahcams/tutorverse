import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AssignmentDetail from './AssignmentDetails.js'

export default function AssignmentList({ cls }) {
  const [assignmentIds,setAssignmnentIds] = useState(cls.assignments)
  const [assignments,setAssignmnents] = useState([])
  
  let getAssignments = async () => {
    if (assignmentIds.length === 1) {
        const fetched = await axios.get(`http://localhost:3001/assignments/${assignmentIds}`)
        setAssignmnents(fetched.data)
    } else if (assignmentIds.length > 1) {
          const fetched = await axios.get(`http://localhost:3001/assignments/`,{
              params: assignmentIds
            })
            setAssignmnents(fetched.data)
    }
  }          
  useEffect(()=> {
    getAssignments()
  },[])
  // return null
    return (
      <div>
        { assignments.length > 0 &&
          assignments.map((assignment) => {
            return <AssignmentDetail props={assignment} key={assignment._id} />
          })
        }
      </div>
    )  
}
