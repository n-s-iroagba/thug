import React, { useState } from "react";
import { Card, Button, Modal, Container, Row, Col, Form } from "react-bootstrap";
import { AppliedMeetGreet } from "../types/MeetGreet";
import EditMeetGreetModal from "./EditMeetGreetModal";


// Sample Data
const meetGreetByCelebrity: Record<string, AppliedMeetGreet[]> = {
//   "Celebrity A": [
//     { id: 1, fanId: 101, celebrityId: 201, date: new Date("2024-06-01"), durationInDays: 2, price: "500", status: "Active" },
//     { id: 2, fanId: 102, celebrityId: 201, date: new Date("2024-06-05"), durationInDays: 1, price: "300", status: "Pending" },
//   ],
//   "Celebrity B": [
//     { id: 3, fanId: 103, celebrityId: 202, date: new Date("2024-07-10"), durationInDays: 3, price: "800", status: "Expired" },
//   ],
//   "Celebrity C": [
//     { id: 4, fanId: 104, celebrityId: 203, date: new Date("2024-08-20"), durationInDays: 2, price: "600", status: "Unpaid" },
//   ],
};

const AppliedMeetGreetList: React.FC<{isUnVerified?:boolean
}>= ({isUnVerified}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMeetGreet, setSelectedMeetGreet] = useState<AppliedMeetGreet | null>(null);

  const handleEditClick = (meetGreet: AppliedMeetGreet) => {
    setSelectedMeetGreet(meetGreet);
    setShowEditModal(true);
  };

  const handleDeleteClick = (meetGreet: AppliedMeetGreet) => {
    setSelectedMeetGreet(meetGreet);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting Meet & Greet:", selectedMeetGreet);
    setShowDeleteModal(false);
  };

  // Filter celebrities based on search query (case insensitive)
  const filteredCelebrities = Object.entries(meetGreetByCelebrity).filter(([celebrity]) =>
    celebrity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <h2 className="mt-4">Meet & Greet Events</h2>

      {/* Search Bar */}
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search for a celebrity..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form>

      {/* Display Meet & Greet events grouped by celebrity */}
      {filteredCelebrities.length > 0 ? (
        filteredCelebrities.map(([celebrity, events]) => (
          <div key={celebrity} className="mb-4">
            <h3>{celebrity}</h3>
            <Row>
              {events.map((event) => (
                <Col md={4} key={event.id}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>{event.status} Meet & Greet</Card.Title>
                      <Card.Text>
                        <strong>Date:</strong> {event.date?.toLocaleDateString()} <br />
                        <strong>Duration:</strong> {event.durationInDays} days <br />
                        <strong>Price:</strong> ${event.price}
                      </Card.Text>
                      <Button variant="primary" onClick={() => handleEditClick(event)} className="me-2">
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDeleteClick(event)}>
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}

      {/* Edit Modal */}
      <EditMeetGreetModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        meetGreet={selectedMeetGreet}
      />

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this Meet & Greet event?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AppliedMeetGreetList;
