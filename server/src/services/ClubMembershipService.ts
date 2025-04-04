import { ClubMembership, ClubMembershipAttributes, ClubMembershipCreationAttributes } from "../models/ClubMembership";
import { Celebrity } from "../models/Celebrity";

export class ClubMembershipService {
  /**
   * Create a new club membership
   * @param membershipData Data to create membership
   * @returns Created membership
   */
  static async createMembership(
    membershipData: ClubMembershipCreationAttributes
  ): Promise<ClubMembership> {
    try {
      const membership = await ClubMembership.create(membershipData);
      return membership;
    } catch (error) {
      throw new Error(`Error creating club membership: ${error instanceof Error ? error.message : String(error)}`);
    }
  }


  

  static async updateMembership(
  
    updateData: Partial<ClubMembershipAttributes>
  ): Promise<ClubMembership | null> {
    try {
      const membership = await ClubMembership.findByPk(updateData.id);
      if (!membership) {
        return null;
      }

      await membership.update(updateData);
      return membership;
    } catch (error) {
      throw new Error(`Error updating club membership: ${error instanceof Error ? error.message : String(error)}`);
    }
  }


    static async getAllClubMembershipsGroupedByCelebrity(): Promise<Record<string, ClubMembershipAttributes[]>> {
      try {
        // Fetch all memberships, including associated celebrity data
        const memberships = await ClubMembership.findAll({
          include: {
            model: Celebrity,
            as: "celebrity",
            attributes: ["firstName",'surname','stageName'], // Only include the celebrity name
          },
        });
  
        // Group memberships by celebrity name
        const groupedMemberships: Record<string, ClubMembershipAttributes[]> = {};
  
        memberships.forEach((membership) => {
          const celebrityName = (membership.celebrity?.firstName + (membership.celebrity?.surname||'') + '(' + membership.celebrity?.stageName + ')' )|| "Unknown Celebrity"; // Default to 'Unknown Celebrity' if no celebrity
  
          if (!groupedMemberships[celebrityName]) {
            groupedMemberships[celebrityName] = [];
          }
  
          groupedMemberships[celebrityName].push(membership);
        });
  
        return groupedMemberships;
      } catch (error) {
        throw new Error(`Error fetching and grouping memberships: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  }
  
  export default ClubMembershipService;
  



