
import { Celebrity } from "./Celebrity";
import { Fan } from "./Fan";


export type Event = {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    image: string;
    amount:number;
    amountPaid:number;
    fanId:number
    celebrityId:number
      status:"Active"| "Pending"| "Expired"|"Unpaid";
      fan:Fan
      celebrity:Celebrity
  }

export type BookEvent = {
    eventType: string;
    eventDate: string;
    eventLocation: string;
    budget: string;
    specialRequests: string;
  }
