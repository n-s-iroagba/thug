import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { AppliedMeetGreet } from '../types/MeetGreet';
import { Props } from '../types/IdProps';



const AppliedMeetGreetGroupedByCelebrity: React.FC<Props> = ({ id, isPending }) => {
  const groupedData:{ [key: number]: AppliedMeetGreet[] } = {}



  return (
    <div>
      {Object.keys(groupedData).map((celebrityId) => {
        // Cast the celebrityId to a number since Object.keys returns a string array
        const numericCelebrityId = Number(celebrityId);
        const celebrityAppliedMeetGreets = groupedData[numericCelebrityId];
        const celebrityName = celebrityAppliedMeetGreets[0]?.celebrity?.firstName;

        return (
          <div key={numericCelebrityId}>
            <h3>{celebrityName}</h3>
            <Row>
              {celebrityAppliedMeetGreets.map((meetGreet) => (
                <Col key={meetGreet.id} md={4}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>Meet Greet #{meetGreet.id}</Card.Title>
                      <Card.Text>
                        <strong>Status: </strong>{meetGreet.status}
                      </Card.Text>
                      <Card.Text>
                        <strong>Duration: </strong>{meetGreet.durationInDays} days
                      </Card.Text>
                      <Card.Text>
                        <strong>Price: </strong>{meetGreet.price}
                      </Card.Text>
                      <Card.Text>
                        <strong>Date: </strong>{new Date(meetGreet.date || '').toLocaleDateString()}
                      </Card.Text>
                      {meetGreet.payments && meetGreet.payments.length > 0 && (
                        <Card.Text>
                          <strong>Payments: </strong>{meetGreet.payments.length}
                        </Card.Text>
                      )}
                      <Button variant="primary" onClick={() => console.log('Edit meet greet')}>Edit</Button>
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

export default AppliedMeetGreetGroupedByCelebrity;
