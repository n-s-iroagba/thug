// TierDetailsForm.tsx
import React, { useState } from 'react';
import { ClubMembership } from '../types/ClubMembership';



interface TierDetailsFormProps {
  numberOfTiers: any;
  setStep:any;
  tiers:any
  setTiers:any
}

const TierDetailsForm: React.FC<TierDetailsFormProps> = ({ numberOfTiers,setStep,tiers,setTiers }) => {
 
  const [index,setIndex] = useState(0)
  const handleTierChange = (index: number, field: keyof ClubMembership, value: string | number) => {
    const newTiers = [...tiers];
    newTiers[index] = {
      ...newTiers[index],
      [field]: value
    };
    setTiers(newTiers);
  };

  const handleBenefitChange = (tierIndex: number, benefitIndex: number, value: string) => {
    const newTiers = [...tiers];
    const newfeatures = [...newTiers[tierIndex].features];
    newfeatures[benefitIndex] = value;
    newTiers[tierIndex].features = newfeatures;
    setTiers(newTiers);
  };

  const addBenefit = (tierIndex: number) => {
    const newTiers = [...tiers];
    newTiers[tierIndex].features.push('');
    setTiers(newTiers);
  };

  const removeBenefit = (tierIndex: number, benefitIndex: number) => {
    const newTiers = [...tiers];
    newTiers[tierIndex].features.splice(benefitIndex, 1);
    setTiers(newTiers);
  };

  const handleSubmit = (e: React.FormEvent) => {
   if (index === tiers.length){
    setStep((prev:number)=>prev +1)
   }else{
    setIndex(index+1)
   }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Step 2: Define Your Membership Tiers</h2>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={tiers[index].price}
              onChange={(e) => handleTierChange(index, 'price', parseFloat(e.target.value))}
              required
            />
          </div>
          <div>
           
          <div>
            <label>features:</label>
            {tiers[index].features.map((benefit:string, benefitIndex:number) => (
              <div key={benefitIndex}>
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleBenefitChange(index, benefitIndex, e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => removeBenefit(index, benefitIndex)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={() => addBenefit(index)}
            >
              Add Benefit
            </button>
          </div>
        </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default TierDetailsForm;