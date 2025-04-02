
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your login logic here
  };

  return (
    <Container className="my-5 px-4" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-5">Welcome Back to CelebLinks</h2>
      
      <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
        {/* Email Field */}
        <Form.Group className="mb-4 position-relative">
          <Form.Label className="position-absolute" style={{ left: '0', top: '-20px', fontSize: '0.9rem' }}>
            Email Address
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border-0 border-bottom rounded-0 px-0"
            style={{
              backgroundColor: 'transparent',
              borderBottom: '2px solid #8a2be2',
              transition: 'border-color 0.3s ease',
              boxShadow: 'none'
            }}
          />
        </Form.Group>

        {/* Password Field */}
        <Form.Group className="mb-5 position-relative">
          <Form.Label className="position-absolute" style={{ left: '0', top: '-20px', fontSize: '0.9rem' }}>
            Password
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border-0 border-bottom rounded-0 px-0"
            style={{
              backgroundColor: 'transparent',
              borderBottom: '2px solid #8a2be2',
              transition: 'border-color 0.3s ease',
              boxShadow: 'none'
            }}
          />
        </Form.Group>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <Form.Check 
            type="checkbox"
            label="Remember me"
            className="text-muted"
          />
          <a href="/forgot-password" style={{ color: '#8a2be2' }}>Forgot password?</a>
        </div>

        <Button 
          variant="primary" 
          type="submit" 
          className="w-100 py-3"
          style={{
            background: 'linear-gradient(45deg, #8a2be2, #9400d3)',
            border: 'none',
            borderRadius: '30px',
            fontSize: '1.1rem',
            fontWeight: '600'
          }}
        >
          Login
        </Button>

        <p className="text-center mt-4">
          Don't have an account?{' '}
          <a href="/signup" style={{ color: '#8a2be2', fontWeight: '600' }}>Sign up</a>
        </p>
      </Form>

      <style>
        {`
          .form-control:focus {
            border-color: #9400d3 !important;
            outline: 0;
            box-shadow: none !important;
          }
          .form-control::placeholder {
            color: #aaa;
            opacity: 1;
          }
        `}
      </style>
    </Container>
  );
};
export default  Login
