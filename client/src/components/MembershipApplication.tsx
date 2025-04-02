import React, { useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Spinner } from 'react-bootstrap';
import { ClubMembership } from '../types/ClubMembership';
import Celebrity from '../types/Celebrity';

interface MembershipSelectionProps {
  selectedMembership: ClubMembership | null;
  memberships: ClubMembership[];
  setSelectedMembership: (membership: ClubMembership) => void;
  isSignedIn:boolean
   setComponentView: React.Dispatch<React.SetStateAction<any>>;
  contactType:"event" | "meet" | "club" | "text" | 'signup'|''
  selectedCelebrity:Celebrity|null
}

const MembershipSelection: React.FC<MembershipSelectionProps> = ({ 
  selectedMembership,
  memberships,
  setSelectedMembership,
  setComponentView,
  selectedCelebrity,
  isSignedIn
}) => {
  useEffect(() => {
    if (selectedMembership && memberships) {
      const membership = memberships.find((m) => m.id === selectedMembership.id);
      if (membership) {
        setSelectedMembership(membership);
      }
    }
  }, [memberships, selectedMembership, setSelectedMembership]);

  const handleSubmit = ()=>{
    if(isSignedIn){
      //createPayment
    }else
    setComponentView('signin')
  }

  if (!memberships) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading membership options...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5 px-4" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-5">Select Membership Tier</h2>
      
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="d-flex flex-column gap-3">
            {memberships.map((membership) => (
              <Card 
                key={membership.id}
                className={`cursor-pointer ${selectedMembership?.id === membership.id ? 'border-primary' : ''}`}
                onClick={() => setSelectedMembership(membership)}
                style={{
                  border: selectedMembership?.id === membership.id ? '2px solid #8a2be2' : '1px solid #dee2e6',
                  transition: 'border-color 0.3s ease'
                }}
              >
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h4>{membership.tier}</h4>
                      <h3 className="text-primary">${membership.price}</h3>
                    </div>
                    {selectedMembership?.id === membership.id && (
                      <span className="badge bg-success">Selected</span>
                    )}
                  </div>
                  <ListGroup variant="flush" className="mt-3">
                    {membership.features.map((feature, index) => (
                      <ListGroup.Item key={index} className="py-2 px-0 border-0">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        {feature}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
      <button onClick={()=>handleSubmit}>Sign in</button>

      <style>
        {`
          .cursor-pointer {
            cursor: pointer;
          }
        `}
      </style>
    </Container>
  );
};

export default MembershipSelection;