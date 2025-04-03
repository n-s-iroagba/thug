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
  ): Promise<[number, DefaultClubMembership[]]> {
    return await DefaultClubMembership.update(updates, { 
      where: { id },
      returning: true 
    });
  }

  // ✅ Delete a membership
  static async deleteMembership(id: number): Promise<number> {
    return await DefaultClubMembership.destroy({
      where: { id }
    });
  }
}

export default DefaultClubMembershipService;
