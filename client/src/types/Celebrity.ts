import { ClubMembership } from "./ClubMembership";
import { Job } from "./Job";
export default interface Celebrity {
    id?:string
    stageName: string;
    firstName: string;
    surname: string;
    bio:string;
    memberships:ClubMembership[]
    isConfirmed:boolean;
    image: string;
    jobs?:Job[]
   
  }