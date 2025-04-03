import Celebrity from "./Celebrity";
import { Fan } from "./Fan";
import { Payment } from "./Payment";

export type MeetGreetReference = CreateMeetGreetReference & {
    id: number;
    celebrityId: number | null;
}
export type CreateMeetGreetReference = {
    pricePerDay: number;
    features: string[];
}

export type MeetGreetBooking={
    date: Date | null;
    durationInDays: number;
    expectations: string;
    price:string;
  }

export type AppliedMeetGreet = {
    id: number;
    fanId:number
    celebrityId:number
    status:"Active"| "Pending"| "Expired"|"Unpaid";
    fan:Fan
    celebrity: Celebrity
    payments:Payment[]|null
    date: Date | null;
    durationInDays: number;
    price:string;
}

