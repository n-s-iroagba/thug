import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Message } from '../types/Messages';
import { IdProps } from '../types/IdProps';



const MessagesGroupedByCelebrity: React.FC<IdProps> = ({ id }) => {
  const groupedMessages:{ [key: number]: Message[] }={};


  return (
    <div>
      {Object.keys(groupedMessages).map((celebrityId) => {
        const numericCelebrityId = Number(celebrityId);
        const celebrityMessages = groupedMessages[numericCelebrityId];
        
        if (celebrityMessages.length === 0) return null;

        const celebrityName = celebrityMessages[0]?.celebrity?.firstName;

        return (
          <div key={numericCelebrityId}>
            <h3>{celebrityName}</h3>
            <Row>
              {celebrityMessages.map((message) => (
                <Col key={message.id} md={4}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>Message #{message.id}</Card.Title>
                      <Card.Text>
                        <strong>Status: </strong>{message.isSeen ? 'Seen' : 'Unseen'}
                      </Card.Text>
                      <Card.Text>
                        <strong>Content: </strong>{message.content}
                      </Card.Text>
                      <Button variant="primary" onClick={() => console.log('Edit message')}>Edit</Button>
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

export default MessagesGroupedByCelebrity;
