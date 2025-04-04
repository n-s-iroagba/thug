import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Spinner } from 'react-bootstrap';
import { ClubMembership, DefaultClubMembership } from '../types/ClubMembership';
import Celebrity, { FanCreateCelebrity } from '../types/Celebrity';

interface MembershipSelectionProps {
  selectedMembership: ClubMembership | DefaultClubMembership|null;
 
  setSelectedMembership: Dispatch<SetStateAction<ClubMembership |DefaultClubMembership| null>>
  isSignedIn:boolean
   setComponentView?: React.Dispatch<React.SetStateAction<any>>;
  contactType?:"event" | "meet" | "club" | "text" | 'signup'|''
  selectedCelebrity:Celebrity|FanCreateCelebrity|null
}

const MembershipApplication: React.FC<MembershipSelectionProps> = ({ 
  selectedMembership,
  setSelectedMembership,
  setComponentView,
  selectedCelebrity,
  isSignedIn
}) => {
  const [memberships, setMemberships] = useState<DefaultClubMembership[] |ClubMembership[]>([]);

  useEffect(() => {
    const fetchMeetGreetReference = async () => {
      try {
        const response = await fetch(
         selectedCelebrity && "id" in selectedCelebrity 
          ? `/api/memberships/${selectedCelebrity.id}`
          : `/api/memberships/default-reference`
        );
        const data:DefaultClubMembership[] |ClubMembership[] = await response.json();
        setMemberships(data);
      } catch (error) {
        console.error("Error fetching Meet & Greet reference:", error);
      }
    };

    fetchMeetGreetReference();
  }, [selectedCelebrity]);

  const handleSubmit = ()=>{
    if(isSignedIn){
      //createPayment
    }else if(setComponentView)
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
                      <ListGroup variant="flush" className="mt-3">
                        {membership.features.map((feature, index) => (
                      <ListGroup.Item key={index} className="py-2 px-0 border-0">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        {feature}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                    </div>
                    {selectedMembership?.id === membership.id && (
                      <span className="badge bg-success">Selected</span>
                    )}
                  </div>
                  
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

export default MembershipApplication;