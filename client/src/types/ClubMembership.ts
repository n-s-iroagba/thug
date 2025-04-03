import Celebrity from "./Celebrity";
import { Fan } from "./Fan";
import { Payment } from "./Payment";




export type DefaultClubMembership = CreateDefaultClubMembership &  {id:string}

export type CreateDefaultClubMembership = {
  tier: string;
  features: string[];
  price: number;

}

export type DefaultBulkClubMembership = {
  memberships:DefaultClubMembership[]
}

export type ClubMembership = {
  id: string;
  tier: string;
  features: string[];
  price: number;
  celebrityId:number
}

export type AppliedClubMembership = {
  fanId:number
  status:"Active"| "Pending"| "Expired"|"Unpaid"
  celebrityId:number
  celebrity:Celebrity
  fan:Fan

  membership:ClubMembership
  payments:Payment[]
  nextPaymentDate:Date
}