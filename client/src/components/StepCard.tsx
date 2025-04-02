import React from "react";
import { Card } from "react-bootstrap";

interface StepCardProps {
  imageSrc: string;
  stepTitle: string;
  subtitle: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ imageSrc, stepTitle, subtitle, description }) => {
  return (
    <Card className="text-start step-card border-0">
      <Card.Img variant="top" src={imageSrc} className="step-image"  style={{width:'7rem', height:'7rem'}}/>
      <Card.Body>
        <Card.Title className="fw-bold fs-3 mb-4">{stepTitle}</Card.Title>
        <Card.Subtitle className="text-muted fw-semibold mb-4">{subtitle}</Card.Subtitle>
        <Card.Text className="fs-6"><small>{description}</small></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default StepCard;
