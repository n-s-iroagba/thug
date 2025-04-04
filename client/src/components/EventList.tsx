import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from './EventCard';
import EditEventModal from './EditEventModal';
import { Event } from '../types/Event';

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchEvents = async () => {
    const res = await axios.get('/api/events');
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setShowModal(true);
  };

  const handleSave = async (updated: Event) => {
    await axios.put(`/api/events/${updated.id}`, updated);
    setShowModal(false);
    fetchEvents();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await axios.delete(`/api/events/${id}`);
      fetchEvents();
    }
  };

  return (
    <div>
      <h3 className="mb-4">Events</h3>
      {events.map(event => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

      <EditEventModal
        show={showModal}
        onHide={() => setShowModal(false)}
        event={editingEvent}
        onSave={handleSave}
      />
    </div>
  );
};

export default EventList;
