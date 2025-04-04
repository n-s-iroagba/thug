import React, { useEffect, useState } from 'react';
import { Accordion, Card, Row, Col, Button } from 'react-bootstrap';

// Assuming you have these types
interface Charity {
  id: number;
  name: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
}

interface Celebrity {
  id: number;
  name: string;
}

interface CharityGrouped {
  celebrity: Celebrity;
  charities: Charity[];
}

interface Props {
  getCharitiesGroupedByCelebrity: () => Promise<any>;
}

const CharitiesGroupedByCelebrity: React.FC<Props> = ({ getCharitiesGroupedByCelebrity }) => {
  const [groupedCharities, setGroupedCharities] = useState<{ [key: string]: CharityGrouped }>({});

  useEffect(() => {
    // Fetch the grouped charities when the component mounts
    getCharitiesGroupedByCelebrity().then((data) => setGroupedCharities(data));
  }, [getCharitiesGroupedByCelebrity]);

  return (
    <div>
      {Object.keys(groupedCharities).map((celebrityId) => {
        const celebrityData = groupedCharities[celebrityId];
        const celebrity = celebrityData.celebrity;
        const charities = celebrityData.charities;

        if (charities.length === 0) return null;

        return (
          <Accordion key={celebrityId}>
            <Accordion.Item eventKey={celebrityId}>
              <Accordion.Header>{celebrity?.name}</Accordion.Header>
              <Accordion.Body>
                <Row>
                  {charities.map((charity: Charity) => (
                    <Col key={charity.id} md={4}>
                      <Card className="mb-4">
                        <Card.Body>
                          <Card.Title>{charity.name}</Card.Title>
                          <Card.Text>{charity.description}</Card.Text>
                          <Card.Text>
                            <strong>Goal Amount: </strong>${charity.goalAmount}
                          </Card.Text>
                          <Card.Text>
                            <strong>Raised Amount: </strong>${charity.raisedAmount}
                          </Card.Text>
                          <Button variant="primary" onClick={() => console.log('Donate')}>Donate</Button>
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

export default CharitiesGroupedByCelebrity;
