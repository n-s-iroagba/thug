import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import { ClubMembership, DefaultClubMembership } from "../types/ClubMembership";

interface EditMembershipModalProps {
  show: boolean;
  handleClose: () => void;
  membership: DefaultClubMembership | ClubMembership| null;

}

const EditMembershipModal: React.FC<EditMembershipModalProps> = ({
  show,
  handleClose,
  membership,

}) => {
  const [formData, setFormData] = useState<DefaultClubMembership|ClubMembership | null>(membership);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return;

    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev!,
      [name]: name === "price" ? parseFloat(value) || 0 : value, // Convert price to a number
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (!formData) return;

    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;

    setFormData((prev) => ({
      ...prev!,
      features: updatedFeatures,
    }));
  };

  const addFeature = () => {
    if (!formData) return;
    setFormData((prev) => ({
      ...prev!,
      features: [...prev!.features, ""], // Add an empty feature input
    }));
  };

  const removeFeature = (index: number) => {
    if (!formData) return;
    setFormData((prev) => ({
      ...prev!,
      features: prev!.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (formData) {
   
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Edit Membership</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formData ? (
          <Form>
            <Form.Group controlId="tier">
              <Form.Label>Tier</Form.Label>
              <Form.Control
                type="text"
                name="tier"
                value={formData.tier}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="price" className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="features" className="mt-3">
              <Form.Label>Features</Form.Label>
              {formData.features.map((feature, index) => (
                <div key={index} className="d-flex align-items-center gap-2 mb-2">
                  <Form.Control
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                  />
                  <Button variant="danger" size="sm" onClick={() => removeFeature(index)}>
                    ×
                  </Button>
                </div>
              ))}
              <Button variant="success" size="sm" onClick={addFeature}>
                + Add Feature
              </Button>
            </Form.Group>
          </Form>
        ) : (
          <p>No membership selected.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditMembershipModal;
