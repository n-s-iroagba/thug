// TierNumberForm.tsx
import React from 'react';

interface TierNumberFormProps {
  setNumberOfTiers:any
  numberOfTiers:number
  setStep:any
}

const TierNumberForm: React.FC<TierNumberFormProps> = ({ setNumberOfTiers,numberOfTiers,setStep }) => {
  const handleSubmit = ()=>{
    if (numberOfTiers <= 0) {
      alert(numberOfTiers);
      return;
    }
    setStep(1);
    

  }

  const handleNumberChange = (e:any)=>{
  setNumberOfTiers(e.target.value)
}



  return (
    <form onSubmit={handleSubmit}>
      <h2>Step 1: How many membership tiers do you want?</h2>
      <div>
        <label htmlFor="tierCount">Number of Tiers:</label>
        <input
          id="tierCount"
          type="number"
          min="1"
          max="5"
          value={numberOfTiers}
          onChange={(e) => handleNumberChange(e)}
          required
        />
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default TierNumberForm;