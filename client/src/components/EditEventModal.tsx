import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Event } from '../types/Event';

interface Props {
  show: boolean;
  onHide: () => void;
  event: Event | null;
  onSave: (updated: Event) => void;
}

const EditEventModal: React.FC<Props> = ({ show, onHide, event, onSave }) => {
  const [form, setForm] = useState<Event | null>(null);

  useEffect(() => {
    if (event) setForm({ ...event });
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!form) return;
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === 'amount' || name === 'amountPaid' || name === 'celebrityId' || name === 'fanId'
        ? Number(value)
        : value
    });
  };

  const handleSave = () => {
    if (form) onSave(form);
  };

  if (!form) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" value={form.title} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" name="startDate" value={form.startDate?.toString().slice(0, 10)} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" name="endDate" value={form.endDate?.toString().slice(0, 10)} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control name="location" value={form.location} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" name="amount" value={form.amount ?? ''} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount Paid</Form.Label>
            <Form.Control type="number" name="amountPaid" value={form.amountPaid ?? ''} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={form.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Expired">Expired</option>
              <option value="Unpaid">Unpaid</option>
            </Form.Select>
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEventModal;
