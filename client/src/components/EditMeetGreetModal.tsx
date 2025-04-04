



import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AppliedMeetGreet } from "../types/MeetGreet";


interface EditMeetGreetModalProps {
  show: boolean;
  handleClose: () => void;
  meetGreet: AppliedMeetGreet | null;

}

const EditMeetGreetModal: React.FC<EditMeetGreetModalProps> = ({ show, handleClose, meetGreet }) => {
  const [updatedMeetGreet, setUpdatedMeetGreet] = useState(meetGreet);

  const handleChange = (e: any) => {
    if (updatedMeetGreet) {
      setUpdatedMeetGreet({ ...updatedMeetGreet, [e.target.name]: e.target.value });
    }
  };

  const handleSave = () => {
    if (updatedMeetGreet) {
 
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Meet & Greet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {meetGreet && (
          <Form>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={updatedMeetGreet?.date?.toISOString().split("T")[0] || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Duration (days)</Form.Label>
              <Form.Control
                type="number"
                name="durationInDays"
                value={updatedMeetGreet?.durationInDays || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={updatedMeetGreet?.price || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={updatedMeetGreet?.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Expired">Expired</option>
                <option value="Unpaid">Unpaid</option>
              </Form.Select>
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditMeetGreetModal;
