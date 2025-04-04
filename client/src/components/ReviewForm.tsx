// ReviewForm.tsx
import React from 'react';
import { CreateDefaultClubMembership } from '../types/ClubMembership';



interface ReviewFormProps {
  tiers: CreateDefaultClubMembership[];
  onSubmit: () => void;
  onBack: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ tiers, onSubmit, onBack }) => {
  return (
    <div>
      <h2>Step 3: Review Your Membership Tiers</h2>
      <div className="tiers-review">
        {tiers.map((tier, index) => (
          <div key={index} className="tier-review">
          
            <p>Price: ${tier.price}</p>
          
            <ul>
              {tier.features.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
         </div>
        ))}
      </div>
      <div className="form-actions">
        <button type="button" onClick={onBack}>Back</button>
        <button type="button" onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ReviewForm;