import React from 'react';
import { Card, Button, Row, Col, Accordion } from 'react-bootstrap';
import { ClubMembershipSubscription } from '../types/ClubMembership';
import { Props } from '../types/IdProps';



const SubscriptionsGroupedByCelebrity: React.FC<Props> = ({id, isPending}) => {
  const groupedSubscriptions:any ={};



  return (
    <div>
      {Object.keys(groupedSubscriptions).map((celebrityId) => {
        const celebrityData = groupedSubscriptions[celebrityId];
        const celebrity = celebrityData.celebrity;
        const subscriptions = celebrityData.subscriptions;

        if (subscriptions.length === 0) return null;

        return (
          <Accordion key={celebrityId}>
            <Accordion.Item eventKey={celebrityId}>
              <Accordion.Header>{celebrity?.name}</Accordion.Header>
              <Accordion.Body>
                <Row>
                  {subscriptions.map((subscription: ClubMembershipSubscription) => (
                    <Col key={subscription.id} md={4}>
                      <Card className="mb-4">
                        <Card.Body>
                          <Card.Title>Subscription #{subscription.id}</Card.Title>
                          <Card.Text>
                            <strong>Status: </strong>{subscription.status}
                          </Card.Text>
                          <Card.Text>
                            <strong>Tier: </strong>{subscription.membership?.tier}
                          </Card.Text>
                          <Card.Text>
                            <strong>Features: </strong>{subscription.membership?.features}
                          </Card.Text>
                          <Card.Text>
                            <strong>Date of Last Payment: </strong>{new Date(subscription.dateOfLastPayment).toLocaleDateString()}
                          </Card.Text>
                          <Button variant="primary" onClick={() => console.log('Edit subscription')}>Edit</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </div>
  );
};

export default SubscriptionsGroupedByCelebrity;
