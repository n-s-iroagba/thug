import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import { MeetGreetReference } from '../types/MeetGreet';


interface Props {
  meetGreet: MeetGreetReference;
  onEditSave: (updated: MeetGreetReference) => void;
  onDelete: (id: number) => void;
}

const MeetGreetReferenceCard: React.FC<Props> = ({ meetGreet, onEditSave, onDelete }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [form, setForm] = useState<MeetGreetReference>(meetGreet);

  const handleEditModalClose = () => setShowEditModal(false);
  const handleDeleteConfirmClose = () => setShowDeleteConfirm(false);
  const handleEditModalShow = () => setShowEditModal(true);
  const handleDeleteConfirmShow = () => setShowDeleteConfirm(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'pricePerDay' ? Number(value) : value,
    });
  };

  const handleSave = () => {
    onEditSave(form);
    handleEditModalClose();
  };

  const handleDelete = () => {
    onDelete(meetGreet.id);
    handleDeleteConfirmClose();
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{`Meet and Greet: ${meetGreet.id}`}</Card.Title>
          <Card.Text>
            <strong>Price per Day:</strong> ${meetGreet.pricePerDay}
          </Card.Text>
          <Card.Text>
            <strong>Features:</strong> {meetGreet.features.join(', ')}
          </Card.Text>
          <Button variant="warning" onClick={handleEditModalShow}>Edit</Button>{' '}
          <Button variant="danger" onClick={handleDeleteConfirmShow}>Delete</Button>
        </Card.Body>
      </Card>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Meet & Greet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Price Per Day</Form.Label>
              <Form.Control
                type="number"
                name="pricePerDay"
                value={form.pricePerDay}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Features</Form.Label>
              <Form.Control
                as="textarea"
                name="features"
                value={form.features.join(', ')}
                onChange={(e) => setForm({
                  ...form,
                  features: e.target.value.split(',').map((feature) => feature.trim())
                })}
              />
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
          Are you sure you want to delete this Meet & Greet reference?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteConfirmClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MeetGreetReferenceCard;
