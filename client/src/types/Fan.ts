import { ClubMembershipSubscription } from "./ClubMembership";
import { AppliedMeetGreet } from "./MeetGreet";
import { Message } from "./Messages";
import { Event } from "./Event";
import { User } from "./User";

export type Fan =CreateFan &{
    id:string,
    dateOfBirth:Date
    userId:number;
    user?:User
    events?:Event[]
    meetGreets?: AppliedMeetGreet[]
    clubSubscriptions?:ClubMembershipSubscription[]
    messages?:Message []
  };

  export type CreateFan = {
    firstName: string;
    surname: string;
    dateOfBirth: Date | null;
    countryOfResidence: string;
    gender: string;
    occupation:string;
    profilePicture?:string;
  }