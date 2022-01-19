import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";

export default function AddAssignmentModal({ showModal, onClose }) {
  const initialNewAssignment = {
    className: "",
    assignmentName: "",
    link: "",
    instructions: "",
  };

  const [newAssignment, setNewAssignment] = useState(initialNewAssignment);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleAddAssignment = () => {
    setNewAssignment(initialNewAssignment);
    setShow(false);
  };

  const handleClassName = (e) =>
    setNewAssignment({ ...newAssignment, className: e.target.value });

  const handleAssignmentName = (e) =>
    setNewAssignment({ ...newAssignment, assignmentName: e.target.value });

  const handleLink = (e) =>
    setNewAssignment({ ...newAssignment, link: e.target.value });

  const handleInstructions = (e) =>
    setNewAssignment({ ...newAssignment, instructions: e.target.value });

  const handleAddAssignment = async () => {
    const { assignmentName, instructions, link } = newAssignment;
    try {
      setIsLoading(true);
      await axios.post("http://localhost:3001/assignments/", {
        name: assignmentName,
        text: instructions,
        link: link,
      });
      await axios.patch("http://localhost:3001/classes", {
        name: newAssignment.className,
        assignment: assignmentName,
      });
      setIsLoading(false);
      toast.success("Assignment added!");
    } catch (err) {
      setIsLoading(false);
      toast.error("Class not found.");
      console.error(err);
    }
    toggleAddAssignment();
  };

  return (
    <>
      <Button
        className="button-margin"
        id="add-assignment"
        onClick={() => setShow(true)}
      >
        Add an Assignment
      </Button>
      <Modal show={show} onHide={toggleAddAssignment}>
        <Modal.Header closeButton={toggleAddAssignment}>
          Create an Assignment:
        </Modal.Header>
        <Modal.Body>
          <Form id="create-assignment">
            <Form.Group>
              <Form.Label>Class</Form.Label>
              <Form.Control
                type="name"
                value={newAssignment.className}
                placeholder="Enter class name"
                onChange={handleClassName}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Assignment Name</Form.Label>
              <Form.Control
                type="name"
                value={newAssignment.assignmentName}
                placeholder="Enter assignment name"
                onChange={handleAssignmentName}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="name"
                value={newAssignment.link}
                placeholder="Link to assignment"
                onChange={handleLink}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Directions</Form.Label>
              <Form.Control
                type="name"
                value={newAssignment.instructions}
                placeholder="Student instructions"
                onChange={handleInstructions}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={toggleAddAssignment}>
            Discard Changes
          </Button>
          <Button variant="primary" onClick={handleAddAssignment}>
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
