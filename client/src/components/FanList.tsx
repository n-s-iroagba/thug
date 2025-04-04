import React from "react";
import { Spinner, Alert, Card, ListGroup, Button } from "react-bootstrap";
import { useFans } from "../hooks/useFans";
import { deleteFan } from "../utils/apiUtils/fanApiUtils";

const FanList: React.FC = () => {
  const { fans, loading, error } = useFans();
  const [localFans, setLocalFans] = React.useState(fans);

  React.useEffect(() => {
    setLocalFans(fans);
  }, [fans]);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this fan?");
    if (!confirm) return;

    try {
      await deleteFan(Number(id));
      setLocalFans(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      alert("Failed to delete fan.");
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      {localFans.map((fan) => (
        <Card key={fan.id} className="mb-4 shadow-sm">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <span>
              <strong>{fan.firstName} {fan.surname}</strong> ({fan.gender})
            </span>
            <Button variant="danger" size="sm" onClick={() => handleDelete(fan.id)}>
              Delete
            </Button>
          </Card.Header>

          <Card.Body>
            {fan.profilePicture && (
              <img
                src={fan.profilePicture}
                alt="Profile"
                className="img-thumbnail mb-3"
                style={{ width: '100px', height: '100px' }}
              />
            )}

            <p><strong>Country:</strong> {fan.countryOfResidence}</p>
            <p><strong>Occupation:</strong> {fan.occupation}</p>
            <p><strong>Date of Birth:</strong> {new Date(fan.dateOfBirth || new Date()).toLocaleDateString()}</p>

            <hr />

            <h6>Messages</h6>
            <ListGroup>
              {fan.messages && fan.messages.map((msg, idx) => (
                <ListGroup.Item key={idx}>
                  {msg.celebrity.firstName} {msg.celebrity.surname}: {msg.content}
                </ListGroup.Item>
              ))}
            </ListGroup>

            <hr />

            <h6>Club Membership</h6>
            {fan.clubSubscriptions?.length ? (
              fan.clubSubscriptions.map((club, i) => (
                <div key={i}>
                  <p>Status: {club.status}</p>
                  <p>Last Payment: {new Date(club.dateOfLastPayment).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <p>No club subscriptions.</p>
            )}

            <hr />

            <h6>Applied Meet & Greets</h6>
            {fan.meetGreets?.length ? (
              <ListGroup>
                {fan.meetGreets.map((mg) => (
                  <ListGroup.Item key={mg.id}>
                    ID: {mg.id}, Status: {mg.status}, Date: {new Date(mg?.date||'').toLocaleDateString()}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : <p>No meet and greet applications.</p>}

            <hr />

            <h6>Applied Events</h6>
            {fan.events?.length ? (
              <ListGroup>
                {fan.events.map((ev) => (
                  <ListGroup.Item key={ev.id}>
                    {ev.title} - {ev.status} (Starts: {new Date(ev.startDate).toLocaleDateString()})
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : <p>No events applied.</p>}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default FanList;
