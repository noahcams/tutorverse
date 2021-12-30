import React from 'react'

export default function Dashboard() {
  return (
    <div>
      <div className="dashPage">
      <div id="topNavbar">
        <div id="logo">
        Tutorverse
        </div>
        <div id="navComp">
        navbar component
        </div>
      </div>
      <div id="dashContent">
        <div id="assignmentList">
          Assignment List
          <div className="assignment">
            <div className="assignmentName">
            Assignment 1 Name
            </div>
            <div className="assignmentGrade">
            Grade
            </div>
            <div className="assignmentClass">
            Class
            </div>
          </div>
        <div className="assignment">
            <div className="assignmentName">
            Assignment 2 Name
            </div>
            <div className="assignmentGrade">
            Grade
            </div>
            <div className="assignmentClass">
            Class
            </div>
          </div>
        <div className="assignment">
            <div className="assignmentName">
            Assignment 3 Name
            </div>
            <div className="assignmentGrade">
            Grade
            </div>
            <div className="assignmentClass">
            Class
            </div>
          </div>
        </div>
        <div id="details">
          <div className="studentDetail">
            Student Details
          </div>
          <div className="teacherDetail">
            Teacher Details
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
