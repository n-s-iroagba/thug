import React, { useState } from "react";
import { Card, Button, Modal, Container, Row, Col, Form } from "react-bootstrap";
import EditMembershipModal from "./EditMembershipModal";
import { ClubMembership } from "../types/ClubMembership";


// Sample data: Club memberships grouped by celebrity
const membershipsByCelebrity: Record<string, ClubMembership[]> = {};

const ClubMembershipList: React.FC<{unVerified:boolean}> = ({unVerified:boolen}) => {
  const [searchQuery, setSearchQuery] = useState(""); // Search bar state
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState<ClubMembership | null>(null);

  const handleEditClick = (membership: ClubMembership) => {
    setSelectedMembership(membership);
    setShowEditModal(true);
  };

  const handleDeleteClick = (membership: ClubMembership) => {
    setSelectedMembership(membership);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting membership:", selectedMembership);
    setShowDeleteModal(false);
  };

  // Filter celebrities based on search query (case insensitive)
  const filteredCelebrities = Object.entries(membershipsByCelebrity).filter(([celebrity]) =>
    celebrity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <h2 className="mt-4">Club Memberships</h2>

      {/* Search Bar */}
      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="Search for a celebrity..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form>

      {/* Display memberships grouped by celebrity */}
      {filteredCelebrities.length > 0 ? (
        filteredCelebrities.map(([celebrity, memberships]) => (
          <div key={celebrity} className="mb-4">
            <h3>{celebrity}</h3>
            <Row>
              {memberships.map((membership) => (
                <Col md={4} key={membership.id}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>{membership.tier}</Card.Title>
                      <Card.Text>
                        <strong>Price:</strong> ${membership.price} <br />
                        <strong>Features:</strong> {membership.features.join(", ")}
                      </Card.Text>
                      <Button variant="primary" onClick={() => handleEditClick(membership)} className="me-2">
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDeleteClick(membership)}>
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
      <EditMembershipModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        membership={selectedMembership}
      />

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the <strong>{selectedMembership?.tier}</strong> membership?
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

export default ClubMembershipList;
