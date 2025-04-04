import React, { Dispatch, SetStateAction, useState } from "react";
import Celebrity, { FanCreateCelebrity } from "../../types/Celebrity";
import { useNavigate } from "react-router-dom";
import { Button, Form, Alert, Spinner } from "react-bootstrap";

import { ComponentView } from "./FirstBooking";

interface BookingProps {
   setComponentView:  Dispatch<SetStateAction<ComponentView>>;
  selectedCelebrity: Celebrity | null | FanCreateCelebrity;
  message: string;
  setMessage: (msg: string) => void;
  contactType:"event" | "meet" | "club" | "text" | 'signup'|'';
}

const Shoutout: React.FC<BookingProps> = ({
  setComponentView,
  contactType,
  selectedCelebrity,
  message,
  setMessage
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const isSignedIn = false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    if (!selectedCelebrity) {
      setErrorMessage("Please select a celebrity.");
      setSubmitting(false);
      return;
    }

    if (!isSignedIn) {
      setComponentView('signup');
      setSubmitting(false);
      return;
    }

    if (!message.trim()) {
      setErrorMessage("Please write your message before submitting.");
      setSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("celebrity", JSON.stringify(selectedCelebrity));
      formData.append("message", message);
      formData.append("contactType", contactType);

      const response = await fetch('', {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.response.ok){
        navigate('/dashboard')
      }
    
    } catch (error) {
      console.error("Error sending shoutout:", error);
      setErrorMessage("Sorry, an error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!selectedCelebrity) {
    return (
      <Alert variant="warning">
        Please select a celebrity first.
      </Alert>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      {errorMessage && (
        <Alert variant="danger" className="mb-3">
          {errorMessage}
        </Alert>
      )}

      <Form.Group className="mb-3" controlId="formMessage">
        <Form.Label>
          Write a heartfelt message to {selectedCelebrity.firstName} {selectedCelebrity.surname}
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={8}
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={submitting}
        />
      </Form.Group>

      <Button 
        type="submit" 
        disabled={submitting || !message.trim()}
        className="d-flex align-items-center gap-2"
      >
        {submitting ? (
          <>
            <Spinner as="span" animation="border" size="sm" />
            Submitting...
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </Form>
  );
};

export default Shoutout;