import { ClubMembership } from "./ClubMembership";

export type Celebrity = CreateCelebrity & {
    id:number
    clubMemberships:ClubMembership[]
    isConfirmed:boolean;
  }

  export type CreateCelebrity = {
    stageName: string;
    firstName: string;
    surname: string;
    bio:string;
    image: string;
  }


  export type FanCreateCelebrity = {
    stageName:string
    firstName:string
    surname:string;
  }
  export default Celebrity