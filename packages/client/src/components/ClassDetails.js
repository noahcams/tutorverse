import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Card, Button, ButtonToolbar, Modal } from "react-bootstrap";
import AssignmentDetail from "./AssignmentDetails";
import StudentDetails from "./StudentDetails";
import AddAssignmentModal from "./AddAssignmentModal.js";
import AddStudentModal from "./AddStudentModal.js";
import { calculateAverage } from "../utils/helpers.js";

export default function ClassDetails({ user }) {
  const [cls, setCls] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [assignmentShow, setAssignmentShow] = useState(false);
  const params = useParams();

  const getClassDetail = async () => {
    try {
      const fetched = await axios.get(
        `http://localhost:3001/classes/${params.id}`
      );
      setCls(fetched.data);
      if (fetched.data.students.length === 0) {
        setStudents([]);
      } else {
        fetched.data.students.map(async (id) => {
          const fetched = await axios.get(`http://localhost:3001/users/${id}`);
          setStudents((students) => [...students, fetched.data]);
        });
        setStudents(students.filter((s) => s.type === "student"));
      }
      fetched.data.assignments.map(async (as) => {
        const fetched = await axios.get(
          `http://localhost:3001/assignments/${as}`
        );
        setAssignments((assignments) => [...assignments, fetched.data]);
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getClassDetail();
  }, []);
  return (
    <Card>
      <Card.Header className="name">{cls.name}</Card.Header>
      <ButtonToolbar className="p-4">
        {user.type === "teacher" && (
          <>
            <AddAssignmentModal
              showModal={assignmentShow}
              onClose={() => setAssignmentShow(false)}
            />
            <AddStudentModal cls={cls} />
          </>
        )}
      </ButtonToolbar>
      <Card.Body>
        {user.type === "student" && (
          <h2>Overall Grade: {calculateAverage(user.grades).toFixed(2)}%</h2>
        )}
        <h4>Assignments:</h4>
        {assignments.map((as) => {
          return <AssignmentDetail assignment={as} key={as._id} />;
        })}
        {user.type === "teacher" && students.length > 0 && (
          <>
            <h4>Students:</h4>
            {students.map((s) => (
              <StudentDetails user={s} cls={cls} key={s._id} />
            ))}
          </>
        )}
      </Card.Body>
    </Card>
  );
}
