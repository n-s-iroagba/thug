import Celebrity from "./Celebrity";
import { Fan } from "./Fan";
import { Payment } from "./Payment";




export type DefaultClubMembership = CreateDefaultClubMembership &  {id:number}

export type CreateDefaultClubMembership = {
  tier: string;
  features: string[];
  price: number;

}

export type DefaultBulkClubMembership = {
  memberships:DefaultClubMembership[]
}

export type ClubMembership = {
  id: number;
  tier: string;
  features: string[];
  price: number;
  celebrityId:number
}

export type ClubMembershipSubscription = {
  id:number
  fanId:number
  status:"Active"| "Pending"| "Expired"|"Unpaid"
  celebrityId:number
  celebrity:Celebrity
  fan:Fan
  isMax:boolean
  dateOfLastPayment:Date
  membership:ClubMembership
  payments:Payment[]
  nextPaymentDate:Date
}