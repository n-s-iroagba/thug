import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { ClubMembershipSubscription } from '../types/ClubMembership';


interface Props {
  subscription: ClubMembershipSubscription;
  onEditSave: (updated: ClubMembershipSubscription) => void;
  onDelete: (id: number) => void;
}

const ClubMembershipSubscriptionCard: React.FC<Props> = ({ subscription, onEditSave, onDelete }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [form, setForm] = useState<ClubMembershipSubscription>(subscription);

  const handleEditModalClose = () => setShowEditModal(false);
  const handleDeleteConfirmClose = () => setShowDeleteConfirm(false);
  const handleEditModalShow = () => setShowEditModal(true);
  const handleDeleteConfirmShow = () => setShowDeleteConfirm(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSave = () => {
    onEditSave(form);
    handleEditModalClose();
  };

  const handleDelete = () => {
    onDelete(subscription.id);
    handleDeleteConfirmClose();
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{`Subscription: ${subscription.id}`}</Card.Title>
          <Card.Text>
            <strong>Status:</strong> {subscription.status}
          </Card.Text>
          <Card.Text>
            <strong>Last Payment Date:</strong> {subscription.dateOfLastPayment.toLocaleString()}
          </Card.Text>
          <Card.Text>
            <strong>Membership Tier:</strong> {subscription.membership?.tier}
          </Card.Text>
          <Button variant="warning" onClick={handleEditModalShow}>Edit</Button>{' '}
          <Button variant="danger" onClick={handleDeleteConfirmShow}>Delete</Button>
        </Card.Body>
      </Card>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Membership Subscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Expired">Expired</option>
                <option value="Unpaid">Unpaid</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Payment Date</Form.Label>
              <Form.Control
                type="date"
                name="dateOflastPayment"
                value={form.dateOfLastPayment.toISOString().split('T')[0]}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Is Max Tier?</Form.Label>
              <Form.Control
                as="select"
                name="isMax"
                value={form.isMax ? 'true' : 'false'}
                onChange={handleChange}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={handleDeleteConfirmClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this subscription?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteConfirmClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClubMembershipSubscriptionCard;
