import React, { Dispatch, SetStateAction } from 'react';
import { Container, Form } from 'react-bootstrap';
import Celebrity from '../types/Celebrity';

interface FormData {
 
  eventType: string;
  eventDate: string;
  eventLocation: string;
  budget: string;
  specialRequests: string;
}

interface CelebrityRequestFormProps {
  formData: FormData;

  isSignedIn:boolean;
  setComponentView: Dispatch<SetStateAction<any>>
  selectedCelebrity:Celebrity|null
  contactType:"event" | "meet" | "club" | "text" | 'signup'|''
  setFormData:any
}

const CelebrityRequestForm: React.FC<CelebrityRequestFormProps> = ({ 
  formData, 
  setFormData, 
  isSignedIn,
  setComponentView,
  contactType
}) => {

  const handleSubmit=(e:any)=>{
    e.preventDefault();
  }
  return (
    <Container className="my-5 px-4" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-5">Celebrity Appearance Request</h2>
      
      <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>

        {/* Event Type */}
        <Form.Group className="mb-4 position-relative">
          <Form.Label className="position-absolute" style={{ left: '0', top: '-20px', fontSize: '0.9rem' }}>
            Event Type
          </Form.Label>
          <Form.Control
            as="select"
            name="eventType"
            value={formData.eventType}
            onChange={setFormData}
            required
            className="border-0 border-bottom rounded-0 px-0"
            style={{
              backgroundColor: 'transparent',
              borderBottom: '2px solid #8a2be2',
              transition: 'border-color 0.3s ease',
              boxShadow: 'none',
              appearance: 'none',
              backgroundImage: 'none'
            }}
          >
            <option value="">Select event type</option>
            <option value="Birthday">Birthday Party</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate">Corporate Event</option>
            <option value="Charity">Charity Event</option>
            <option value="Other">Other</option>
          </Form.Control>
        </Form.Group>

        {/* Event Date */}
        <Form.Group className="mb-4 position-relative">
          <Form.Label className="position-absolute" style={{ left: '0', top: '-20px', fontSize: '0.9rem' }}>
            Event Date
          </Form.Label>
          <Form.Control
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={setFormData}
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

        {/* Event Location */}
        <Form.Group className="mb-4 position-relative">
          <Form.Label className="position-absolute" style={{ left: '0', top: '-20px', fontSize: '0.9rem' }}>
            Event Location
          </Form.Label>
          <Form.Control
            type="text"
            name="eventLocation"
            value={formData.eventLocation}
            onChange={setFormData}
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

        {/* Budget */}
        <Form.Group className="mb-4 position-relative">
          <Form.Label className="position-absolute" style={{ left: '0', top: '-20px', fontSize: '0.9rem' }}>
            Budget Range
          </Form.Label>
          <Form.Control
            type="text"
            name="budget"
            value={formData.budget}
            onChange={setFormData}
            placeholder="e.g., $5,000 - $10,000"
            className="border-0 border-bottom rounded-0 px-0"
            style={{
              backgroundColor: 'transparent',
              borderBottom: '2px solid #8a2be2',
              transition: 'border-color 0.3s ease',
              boxShadow: 'none'
            }}
          />
        </Form.Group>

        {/* Special Requests */}
        <Form.Group className="mb-5 position-relative">
          <Form.Label className="position-absolute" style={{ left: '0', top: '-20px', fontSize: '0.9rem' }}>
            Special Requests
          </Form.Label>
          <Form.Control
            as="textarea"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={setFormData}
            rows={3}
            className="border-0 border-bottom rounded-0 px-0"
            style={{
              backgroundColor: 'transparent',
              borderBottom: '2px solid #8a2be2',
              transition: 'border-color 0.3s ease',
              boxShadow: 'none',
              resize: 'none'
            }}
          />
        </Form.Group>

        <button 
          type="submit" 
          className="p-2 w-100" 
          style={{
            backgroundColor: 'indigo', 
            color: 'white', 
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Submit Request
        </button>
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

export default CelebrityRequestForm;