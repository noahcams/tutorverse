import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";

export default function AddStudentModal({ cls }) {
  const [show, setShow] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleAddStudent = () => {
    setShow(false);
  };

  const handleStudentName = (e) => {
    setStudentName(e.target.value);
  };

  const handleAddStudent = async () => {
    try {
      setIsLoading(true);
      await axios.patch("http://localhost:3001/classes", {
        studentName: studentName,
        clsName: cls.name,
      });

      setIsLoading(false);
      toast.success("Student successfully added!");
      toggleAddStudent();
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <>
      <Button
        className="button-margin"
        id="add-studnet"
        onClick={() => setShow(true)}
      >
        Add a Student
      </Button>
      <Modal show={show} onHide={toggleAddStudent}>
        <Modal.Header closeButton={toggleAddStudent}>Add Student</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Student</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the full name"
                onChange={handleStudentName}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={toggleAddStudent}>
            Discard Changes
          </Button>
          <Button variant="primary" onClick={handleAddStudent}>
            {isLoading ? (
              <Oval height="20" width="20" color="white" arialLabel="loading" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
