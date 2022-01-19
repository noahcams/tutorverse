import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  ListGroup,
  Row,
  Col,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import AssignmentList from "./AssignmentList.js";
import AddAssignmentModal from "./AddAssignmentModal.js";
import ClassList from "./ClassList.js";
import ClassDetails from "./ClassDetails.js";
import axios from "axios";
import { toast } from "react-toastify";

export default function Dashboard({ user, cls, setCls }) {
  const [keys, setKeys] = useState(user.classIds);
  const [clsShow, setClsShow] = useState(false);
  const [assignmentShow, setAssignmentShow] = useState(false);
  const [form, setForm] = useState("");

  let getDashboard = async () => {
    //
    try {
      const classes = await axios.get(`http://localhost:3001/classes/`, {
        params: keys,
      });
      setCls(classes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (event) => {
    setForm(event.target.value);
  };

  const toggleAddClass = async () => {
    setClsShow(!clsShow);
  };

  const addClass = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/classes/", {
      name: form,
      teacher: user._id,
    });
    await axios.patch(`http://localhost:3001/users/${user._id}`);
  };

  useEffect(() => {
    getDashboard();
  }, [assignmentShow]);

  return (
    <div>
      <Container className="dashPage">
        <Row id="dash">
          {user.type === "student" && (
            <Col>
              <div id="assignmentList">
                <h2>Assignment List</h2>
                {cls.map((cl, i) => {
                  if (cl.assignments.length > 0) {
                    return <AssignmentList cls={cl} key={i} />;
                  }
                })}
              </div>
            </Col>
          )}

          {user.type === "teacher" && (
            <Col>
              <Card className='classesBox'>
                <h2 className="heading">Classes</h2>{" "}
                <Button id="add-class" onClick={toggleAddClass}>
                  Add a Class
                </Button>
                <Modal show={clsShow} onHide={toggleAddClass}>
                  <Modal.Header closeButton={toggleAddClass}>
                    Create a Class:
                  </Modal.Header>
                  <Modal.Body>
                    <Form id="create-class">
                      <Form.Group>
                        <Form.Label>Class Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter a class name..."
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={toggleAddClass}>
                      Discard Changes
                    </Button>
                    <Button variant="primary" onClick={addClass}>
                      Save Class
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Card.Body>
                  <ListGroup className="teacher-classes">
                    {cls.map((c) => {
                      return (
                        <Card className="class" key={c._id}>
                          <Card.Header>
                            <Link
                              to={{
                                pathname: `/class-detail/${c._id}`,
                              }}
                            >
                              Class: {c.name}
                            </Link>
                          </Card.Header>
                          <Card.Body>
                            Students: {c.students.length}
                            <br />
                            Assignments: {c.assignments.length}
                          </Card.Body>
                        </Card>
                      );
                    })}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          )}

          {user.type === "teacher" && (
            <Col>
              <Card className='assignmentsBox'>
                <h2 className="heading">Assignments</h2>{" "}
                <AddAssignmentModal
                  showModal={assignmentShow}
                  onClose={() => setAssignmentShow(false)}
                />
                <Card.Body className="teacher-assignments">
                  {cls.map((c, i) => {
                    return <AssignmentList cls={c} key={i} />;
                  })}
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
