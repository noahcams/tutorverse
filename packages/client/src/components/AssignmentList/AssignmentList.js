import React from 'react'

export default function AssignmentList(classId) {
  const assignments = await axios.get(`classes/${props.classId}`).assignments
  return (
    <div>
      {
        assignments.map((assignment) =>{
          <AssignmentDetail props={assignment} />
        })
      }
    </div>
  )
}
