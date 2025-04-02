import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('X Server error. Form not sent. An error occurred.');
      return;
    }
    // Handle successful submission
    setError('');
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row>
          {/* Features Column */}
          <Col md={6} lg={3} className="mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4">FEATURES</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><p  className="text-white text-decoration-none">Pricing</p></li>
              <li className="mb-2"><p  className="text-white text-decoration-none">Meet & Greet</p></li>
              <li><p  className="text-white text-decoration-none">Exclusive Contents</p></li>
            </ul>
          </Col>

          {/* Company Column */}
          <Col md={6} lg={3} className="mb-4 mb-lg-0">
            <h5 className="text-uppercase mb-4">COMPANY</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><p  className="text-white text-decoration-none">Who We Are</p></li>
              <li className="mb-2"><p  className="text-white text-decoration-none">Our Mission</p></li>
              <li className="mb-2"><p  className="text-white text-decoration-none">Privacy Policy</p></li>
              <li><p  className="text-white text-decoration-none">Terms & Conditions</p></li>
            </ul>
          </Col>

          {/* Get Started Column */}
          <Col md={6} lg={3} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">GET STARTED</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><p  className="text-white text-decoration-none">Buy Membership</p></li>
              <li className="mb-2"><p  className="text-white text-decoration-none">Unlimited Access</p></li>
              <li><p  className="text-white text-decoration-none">Inquiries</p></li>
            </ul>
          </Col>

          {/* Newsletter Column */}
          <Col md={6} lg={3}>
            <h5 className="text-uppercase mb-4">WEEKLY NEWSLETTER</h5>
            <Form onSubmit={handleSubmit} className="mb-4">
              <Form.Group controlId="footerEmail" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="n@uniport.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="py-2"
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                SUBSCRIBE
              </Button>
              {error && <div className="text-danger mt-2 small">{error}</div>}
            </Form>

            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <FontAwesomeIcon icon={faPhone} className="me-2" />
                <span>(815) 984-0012</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                <span>info@elitetalentz.com</span>
              </div>
              <div className="d-flex align-items-start">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 mt-1" />
                <span>191 Peachtree St, Atlanta, CA 30303</span>
              </div>
            </div>
          </Col>
        </Row>

        <hr className="my-4 bg-secondary" />

        <Row className="align-items-center">
          <Col md={6} className="mb-3 mb-md-0">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faXTwitter} size="lg" className="me-3" />
              <span>©2023 EliteTalentz. All Rights Reserved</span>
            </div>
          </Col>
          <Col md={6} className="text-md-end">
            <small className="text-muted">Elite Talent Solutions</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;