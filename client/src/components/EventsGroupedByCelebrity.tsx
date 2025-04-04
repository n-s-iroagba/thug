import React  from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Event } from '../types/Event'; // Assuming the Event type is defined
import { Props } from '../types/IdProps';



const EventsGroupedByCelebrity: React.FC<Props> = ({ id,isPending }) => {
  const groupedData :{ [key: number]: Event[] }={}


  return (
    <div>
      {Object.keys(groupedData).map((celebrityId) => {
        // Cast the celebrityId to a number since Object.keys returns a string array
        const numericCelebrityId = Number(celebrityId);
        const celebrityEvents = groupedData[numericCelebrityId];
        
        // Ensure there is at least one event to avoid undefined errors
        if (celebrityEvents.length === 0) return null;

      const celebrityName = celebrityEvents[0]?.celebrity?.firstName + ' '+ celebrityEvents[0]?.celebrity?.surname +'  ('+celebrityEvents[0]?.celebrity?.stageName+')'

        return (
          <div key={numericCelebrityId}>
            <h3>{celebrityName}</h3>
            <Row>
              {celebrityEvents.map((event) => (
                <Col key={event.id} md={4}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>{event.title}</Card.Title>
                      <Card.Text>
                        <strong>Status: </strong>{event.status}
                      </Card.Text>
                      <Card.Text>
                        <strong>Location: </strong>{event.location}
                      </Card.Text>
                      <Card.Text>
                        <strong>Start Date: </strong>{new Date(event.startDate).toLocaleDateString()}
                      </Card.Text>
                      <Card.Text>
                        <strong>End Date: </strong>{new Date(event.endDate).toLocaleDateString()}
                      </Card.Text>
                      <Card.Text>
                        <strong>Description: </strong>{event.description}
                      </Card.Text>
                      {event.amount !== null && (
                        <Card.Text>
                          <strong>Amount: </strong>{event.amount}
                        </Card.Text>
                      )}
                      {event.amountPaid !== null && (
                        <Card.Text>
                          <strong>Amount Paid: </strong>{event.amountPaid}
                        </Card.Text>
                      )}
                      <Button variant="primary" onClick={() => console.log('Edit event')}>Edit</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        );
      })}
    </div>
  );
};

export default EventsGroupedByCelebrity;
