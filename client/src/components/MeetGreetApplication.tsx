import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Celebrity, { FanCreateCelebrity } from '../types/Celebrity';
import { MeetGreetReference, MeetGreetBooking } from '../types/MeetGreet';





interface MeetGreetApplicationProps {
  bookingData: MeetGreetBooking;
  contactType?: "event" | "meet" | "club" | "text" | "signup" | "";
  setBookingData:any
  isSignedIn:boolean
  selectedCelebrity: Celebrity|FanCreateCelebrity|null;
}

const MeetGreetBookingForm: React.FC<MeetGreetApplicationProps> = ({
  bookingData,
  setBookingData,
  selectedCelebrity,
  isSignedIn
  
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [meetGreetReference, setMeetGreetReference] = useState<MeetGreetReference | null>(null);

  useEffect(() => {
    const fetchMeetGreetReference = async () => {
      try {
        const response = await fetch(
         selectedCelebrity && "id" in selectedCelebrity 
            ? `/api/meet-greet/reference/${selectedCelebrity.id}`
            : `/api/meet-greet/default-reference`
        );
        const data: MeetGreetReference = await response.json();
        setMeetGreetReference(data);
      } catch (error) {
        console.error("Error fetching Meet & Greet reference:", error);
      }
    };

    fetchMeetGreetReference();
  }, [selectedCelebrity]);


  
  const handleDateChange = (date: Date | null) => {
    setBookingData({ ...bookingData, date });
  };

  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };


  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setBookingData({...bookingData,durationInDays:e.target.value});
    setBookingData({...bookingData,price:Number(value)*(meetGreetReference?.pricePerDay||3000)});
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Booking request submitted! Awaiting approval.");
    }, 2000);
  };

  return (
    <Container className="my-5 px-4" style={{ maxWidth: '800px' }}>
      <h2 className="text-center mb-5">Book Meet & Greet</h2>

      <Form onSubmit={handleSubmit} className="mx-auto bg-white p-4 shadow-sm rounded">
        {/* Date Selection */}
        <Form.Group className="mb-4">
          <Form.Label>Start Date</Form.Label>
          <DatePicker
            selected={bookingData.date}
            onChange={handleDateChange}
            minDate={new Date()}
            className="form-control border-0 border-bottom rounded-0 px-0"
            required
          />
        </Form.Group>

        {/* Duration Input */}
        <Form.Group className="mb-4">
          <Form.Label>Duration in Days</Form.Label>
          <Form.Control
            type="number"
            name="durationInDays"
            value={bookingData.durationInDays}
            onChange={handleDurationChange}
            min={1}
            required
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #8a2be2',
              borderRadius: '5px'
            }}
          />
        </Form.Group>

        {/* Expected Experience */}
        <Form.Group className="mb-4">
          <Form.Label>Your Expectations</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="expectations"
            value={bookingData.expectations}
            onChange={handleTextChange}
            placeholder="What are you hoping to get from this experience?"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #8a2be2',
              borderRadius: '5px'
            }}
          />
        </Form.Group>

         {/* Reference Features */}
         {meetGreetReference && (
          <div className="mb-4">
            <h5 className="text-center text-primary">Meet & Greet Features</h5>
            <ul className="list-group">
              {meetGreetReference.features.map((feature, index) => (
                <li key={index} className="list-group-item border-0">
                  ✅ {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Estimated Cost */}
        {meetGreetReference && (
          <div className="mb-4 p-3 text-center bg-light rounded">
            <strong>Estimated Cost: </strong>
            {bookingData.durationInDays * (meetGreetReference?.pricePerDay||3000)} USD
            <br />
            <small className="text-muted">
              *Subject to approval based on the celebrity’s schedule.
            </small>
          </div>
        )}

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
