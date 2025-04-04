import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Event } from '../types/Event';


interface Props {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (eventId: number) => void;
}

const EventCard: React.FC<Props> = ({ event, onEdit, onDelete }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{event.location}</Card.Subtitle>
        <Card.Text>
          {event.description} <br />
          <strong>Status:</strong> {event.status} <br />
          <strong>Amount:</strong> ${event.amount || 0} <br />
          <strong>Paid:</strong> ${event.amountPaid || 0} <br />
          <strong>From:</strong> {new Date(event.startDate).toLocaleDateString()} <br />
          <strong>To:</strong> {new Date(event.endDate).toLocaleDateString()}
        </Card.Text>
        <Button variant="warning" className="me-2" onClick={() => onEdit(event)}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete(event.id)}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
