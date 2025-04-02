

export interface DefaultClubMembership {
  tier: string;
  features: string[];
  price: number;

}

export type DefaultBulkMembership = {
  memberships:DefaultClubMembership[]
}