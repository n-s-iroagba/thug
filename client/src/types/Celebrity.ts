import { ClubMembership } from "./ClubMembership";

export default interface Celebrity {
    id:number
    stageName: string;
    firstName: string;
    surname: string;
    bio:string;
    memberships:ClubMembership[]
    isConfirmed:boolean;
    image: string;
   
  }

  export type FanCreateCelebrity = {
    stageName:string
    firstName:string
    surname:string;
  }