import { Op } from "sequelize";
import DefaultClubMembership, { DefaultClubMembershipCreationAttributes } from "../models/DefaultClubMembership";
import { DefaultClubMembershipAttributes} from "../models/DefaultClubMembership";


class DefaultClubMembershipService {
  

  static async createMembership(data: DefaultClubMembershipCreationAttributes): Promise<DefaultClubMembership> {
    return await DefaultClubMembership.create(data);
  }

  static async createBulkMemberships(
    data: DefaultClubMembershipCreationAttributes[]
  ): Promise<DefaultClubMembership[]> {
    return await DefaultClubMembership.bulkCreate(data);
  }
  

  static async getAllMemberships(filter?: Partial<DefaultClubMembershipAttributes>): Promise<DefaultClubMembership[]> {
    return await DefaultClubMembership.findAll({
      where: filter ? filter : {},
    });
  }

  static async updateMembership(
    id: number, 
    updates: Partial<DefaultClubMembershipAttributes>
  ): Promise<DefaultClubMembershipAttributes | null> {
    try {
      // First, check if the membership exists
      const membership = await DefaultClubMembership.findByPk(id);

      if (!membership) {
        throw new Error(`Membership with id ${id} not found`);
      }

      // Update the membership with provided updates
      await membership.update(updates);
      
      // Return the updated membership instance
      return membership.toJSON();
    } catch (error) {
      throw new Error(`Error updating membership: ${error instanceof Error ? error.message : String(error)}`);
    }
  }


  // ✅ Delete a membership
  static async deleteMembership(id: number): Promise<number> {
    return await DefaultClubMembership.destroy({
      where: { id }
    });
  }
}

export default DefaultClubMembershipService;
