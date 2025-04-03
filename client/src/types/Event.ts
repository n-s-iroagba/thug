import Celebrity from "./Celebrity";
import { Fan } from "./Fan";
import { Ticket } from "./Ticket";

export type Event = {
    id?: number;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    image: string;
    tickets: Ticket[];
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
