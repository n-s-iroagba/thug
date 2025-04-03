

  export type CreateCharity = {
    title: string;
    description: string;
    image: string;
    goalAmount: number;
    raisedAmount: number;
    minimumAmount:number;
  }

  
  export type Charity = CreateCharity &{
    id?: number;
    celebrirty:number;
  }