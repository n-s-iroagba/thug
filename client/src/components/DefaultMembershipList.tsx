import React, { useState } from "react";
import { Card, Button, Modal, ListGroup } from "react-bootstrap";

import { DefaultClubMembership } from "../types/ClubMembership";
import EditMembershipModal from "./EditMembershipModal";

interface DefaultClubMembershipListProps {
  memberships: DefaultClubMembership[];
  onEdit: (membership: DefaultClubMembership) => void;
  onDelete: (id: number) => void;
}

const DefaultClubMembershipList: React.FC<DefaultClubMembershipListProps> = ({
  memberships,
  onEdit,
  onDelete,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState<DefaultClubMembership | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [membershipToDelete, setMembershipToDelete] = useState<number | null>(null);

  const handleEditClick = (membership: DefaultClubMembership) => {
    setSelectedMembership(membership);
    setShowEditModal(true);
  };

  const handleDeleteClick = (id: number) => {
    setMembershipToDelete(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (membershipToDelete !== null) {
      onDelete(membershipToDelete);
      setShowDeleteConfirm(false);
      setMembershipToDelete(null);
    }
  };

  return (
    <div className="d-flex flex-wrap gap-3">
      {memberships.map((membership) => (
        <Card key={membership.id} style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{membership.tier}</Card.Title>
            <Card.Text>
              <strong>Price:</strong> ${membership.price.toFixed(2)}
            </Card.Text>
            <ListGroup variant="flush">
              {membership.features.map((feature, index) => (
                <ListGroup.Item key={index}>{feature}</ListGroup.Item>
              ))}
            </ListGroup>
            <div className="mt-3 d-flex justify-content-between">
              <Button variant="primary" onClick={() => handleEditClick(membership)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDeleteClick(membership.id)}>
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}

   
        <EditMembershipModal membership={selectedMembership} show={showEditModal} handleClose={() => setShowEditModal(false)}/ >
    

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this membership?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DefaultClubMembershipList;
