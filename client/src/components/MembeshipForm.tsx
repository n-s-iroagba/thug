// MembershipForm.tsx
import React, { useState } from 'react';
import TierNumberForm from './TierNumberForm';
import ReviewForm from './ReviewForm';
import TierDetailsForm from './TierDetailsForm';
import { DefaultClubMembership } from '../types/DefaultClubMembership';

const MembershipForm: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [numberOfTiers, setNumberTiers] = useState(0)
    const [tiers, setTiers] = useState<DefaultClubMembership[]>(
       Array(numberOfTiers).fill(null).map((_, i) => ({
         price: 0,
         tier:'',
         features: ['']
       }))
     );

  const handleSubmit = async () => {
    try {
      // Send data to server
      const response = await fetch('/api/memberships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tiers),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      // Handle success
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="membership-form-container">
      {step === 0 && (
        <TierNumberForm setNumberOfTiers={setNumberTiers} setStep={setStep} numberOfTiers={numberOfTiers} />
      )}
      {step === 1 &&  (
        <TierDetailsForm 
          numberOfTiers={numberOfTiers} 
          setStep={setStep}
          tiers={tiers}
          setTiers={setTiers}
        />
      )}
      {step === 2 && (
        <ReviewForm 
          tiers={tiers} 
          onSubmit={handleSubmit}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  );
};

export default MembershipForm;