import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Celebrity from '../types/Celebrity';

interface MeetGreetBooking {
  date: Date | null;
  expectations: string;

}

interface MeetGreetApplicationProps {
  bookingData: MeetGreetBooking;
  contactType:"event" | "meet" | "club" | "text" | 'signup'|''
  setBookingData: (data: MeetGreetBooking) => void;
  selectedCelebrity:Celebrity|null
}

const MeetGreetBookingForm: React.FC<MeetGreetApplicationProps> = ({
  bookingData,
  setBookingData,
  
  selectedCelebrity,
  contactType,
}) => {

  const [isSubmitting,setIsSubmittting] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
  };

  const handleDateChange = (date: Date | null) => {
    setBookingData({
      ...bookingData,
      date
    });
  };

  const handleExpectationsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBookingData({
      ...bookingData,
      expectations: e.target.value
    });
  };

  return (
    <Container className="my-5 px-4" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-5">Book Meet & Greet</h2>
      
      <Form onSubmit={handleSubmit} className="mx-auto bg-white p-4 shadow-sm rounded">
        {/* Date Selection */}
        <Form.Group className="mb-4">
          <Form.Label>Select Date</Form.Label>
          <DatePicker
            selected={bookingData.date}
            onChange={handleDateChange}
            minDate={new Date()}
            className="form-control border-0 border-bottom rounded-0 px-0"
            required
          />
        </Form.Group>

        {/* Expectations */}
        <Form.Group className="mb-4">
          <Form.Label>Your Expectations</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={bookingData.expectations}
            onChange={handleExpectationsChange}
            placeholder="What are you hoping to get from this experience?"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #8a2be2',
              borderRadius: '5px'
            }}
          />
        </Form.Group>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-100 py-3"
          disabled={!bookingData.date || isSubmitting}
          style={{
            background: 'linear-gradient(45deg, #8a2be2, #9400d3)',
            color: 'white',
            border: 'none',
            borderRadius: '30px',
            fontSize: '1.1rem',
            fontWeight: '600',
            opacity: !bookingData.date ? 0.7 : 1,
            cursor: !bookingData.date ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
        </Button>
      </Form>
    </Container>
  );
};

export default MeetGreetBookingForm;