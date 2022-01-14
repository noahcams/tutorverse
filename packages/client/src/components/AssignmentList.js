import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AssignmentDetail from './AssignmentDetails.js'

export default function AssignmentList({ cls }) {
  const [assignmentIds,setAssignmentIds] = useState(cls.assignments)
  const [assignments,setAssignments] = useState([])
  console.log(cls.assignments)
  
  let getAssignments = async () => {
    if (assignmentIds.length === 1) {
      const fetched = await axios.get(`http://localhost:3001/assignments/${assignmentIds}`)
      setAssignments([fetched.data])
    } else {
      assignmentIds.map( async (as)=> {
        const fetched = await axios.get(`http://localhost:3001/assignments/${as}`)
        console.log(fetched.data)
        setAssignments((assignments)=> [...assignments, fetched.data])
      })
      // const fetched = await axios.get(`http://localhost:3001/assignments/`,{
      //   params: assignmentIds
      // })
      // console.log(fetched.data)
      // setAssignments(fetched.data)
    }
  }    

  useEffect(()=> {
    getAssignments()
  },[])

    return (
      <div>
        { 
        // (assignments.length > 1) &&

          assignments.map((as) => {
            console.log(as)
            return <AssignmentDetail props={as} key={as._id} />
          })
        }
      </div>
    )  
}
