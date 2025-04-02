import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faFacebook } from '@fortawesome/free-brands-svg-icons';
import '../assets/styles/Subscription.css'

const SubscriptionForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Container className="my-3 my-md-5 py-2 py-md-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} xl={5} className="text-center px-4 px-sm-5">
          {/* Header Section */}
          <div className="mb-3 mb-md-4">
            <h2 className="h3 h4-md mb-2">Stay in the know</h2>
            <p className="mb-0 text-muted">Subscribe mailing list</p>
          </div>
          
          {/* Email Form */}
          <Form noValidate validated={validated} onSubmit={handleSubmit} className="mb-4 mb-md-5">
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label className="d-block text-start ms-1 mb-1">Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-2 px-3"
              />
              <Form.Control.Feedback type="invalid" className="text-start">
                This field is required.
              </Form.Control.Feedback>
            </Form.Group>
            
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 py-2"
            >
              SUBSCRIBE
            </Button>
          </Form>
          
          {/* Social Media Section */}
          <div className="mt-4 mt-md-5 pt-1">
            <h5 className="h6 mb-3 mb-md-4">Follow Us</h5>
            
            <div className="d-flex justify-content-center gap-3 gap-sm-4 gap-md-5">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="text-decoration-none social-icon">
                <FontAwesomeIcon icon={faInstagram} className="fa-lg fa-fw" />
                <span className="visually-hidden">Instagram</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                 className="text-decoration-none social-icon">
                <FontAwesomeIcon icon={faYoutube} className="fa-lg fa-fw" />
                <span className="visually-hidden">YouTube</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="text-decoration-none social-icon">
                <FontAwesomeIcon icon={faFacebook} className="fa-lg fa-fw" />
                <span className="visually-hidden">Facebook</span>
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SubscriptionForm;