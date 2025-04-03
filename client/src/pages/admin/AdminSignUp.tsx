import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { InputGroup, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from '../../components/ErrorMessage';
import AuthOption from '../../components/AuthOption';
import Logo from '../../components/Logo';
import { CreateAdminFormData } from '../../types/Admin';
import { createAdminUrl } from '../../data/urls';

const AdminSignUp: React.FC = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState<CreateAdminFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    username:'',
    whatsAppNumber:''
  });
  const [validated, setValidated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const showPassword = () => {
    setPasswordType((prev) => (prev === 'text' ? 'password' : 'text'));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
  
    setSubmitting(true);
    setErrorMessage('');
  
    try {
      const response = await fetch(createAdminUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create admin');
      }
  
      const data = await response.json();
      console.log('Success:', data);
      
      navigate(`/verify-email/${data}`); 
  
    } catch (error: any) {
      console.error('Error:', error);
      setErrorMessage(error.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <div className='responsive-padding-sides'>
      <div className='form-wrapper px-5 pt-5 pb-3 mt-5'>
        <h3 className='text-center'>AdminSignUp</h3>
        <div className='d-flex justify-content-center'>
          <Logo/>
        </div>

        <Form className="form py-2" noValidate validated={validated} onSubmit={handleSubmit}>
  <Row>
    {/* Username */}
    <Form.Group as={Col} lg="12" controlId="username">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        required
        name="username"
        value={adminData.username}
        onChange={handleChange}
        className="custom-input bg-transparent form-control"
      />
      <Form.Control.Feedback type="invalid">Please enter a valid username.</Form.Control.Feedback>
    </Form.Group>
  </Row>

  <Row>
    {/* WhatsApp Phone Number */}
    <Form.Group as={Col} lg="12" controlId="whatsAppNumber">
      <Form.Label>WhatsApp Phone Number</Form.Label>
      <Form.Control
        type="tel"
        required
        name="whatsAppNumber"
        value={adminData.whatsAppNumber}
        onChange={handleChange}
        className="custom-input bg-transparent form-control"
      />
      <Form.Control.Feedback type="invalid">Please enter a valid phone number.</Form.Control.Feedback>
    </Form.Group>
  </Row>

  <Row>
    {/* Email */}
    <Form.Group as={Col} lg="12" controlId="email">
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        required
        name="email"
        value={adminData.email}
        onChange={handleChange}
        className="custom-input bg-transparent form-control"
      />
      <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
    </Form.Group>
  </Row>

  <Row>
    {/* Password */}
    <Form.Group as={Col} lg="12" controlId="password">
      <Form.Label>Password</Form.Label>
      <InputGroup>
        <Form.Control
          type={passwordType}
          required
          name="password"
          value={adminData.password}
          onChange={handleChange}
          className="custom-input bg-transparent form-control"
        />
        <InputGroup.Text onClick={showPassword}>
          <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
        </InputGroup.Text>
      </InputGroup>
      <Form.Control.Feedback type="invalid">Please enter your password.</Form.Control.Feedback>
    </Form.Group>
  </Row>

  <Row>
    {/* Confirm Password */}
    <Form.Group as={Col} lg="12" controlId="confirmPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control
        type={passwordType}
        required
        name="confirmPassword"
        value={adminData.confirmPassword}
        onChange={handleChange}
        className="custom-input bg-transparent form-control"
      />
      <Form.Control.Feedback type="invalid">Please confirm your password.</Form.Control.Feedback>
    </Form.Group>
  </Row>

  <a className="small-font grey-text" href="/forgot-password" style={{ cursor: 'pointer' }}>
    Forgot Password
  </a>

  <div className="d-flex justify-content-evenly w-100 pt-3">
    <button className="auth-button" type={submitting ? 'button' : 'submit'}>
      {submitting ? <Spinner animation="border" size="sm" /> : 'Submit'}
    </button>
  </div>
</Form>

        <ErrorMessage message={errorMessage} />
      </div>
      <div className='mt-5'>
        <AuthOption route={'signup'} title={"Don't have an account?"} buttonText={'Sign Up'} />
      </div>
    </div>
  );
};

export default AdminSignUp;
