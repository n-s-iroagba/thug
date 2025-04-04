import { Celebrity, CelebrityAttributes, CelebrityCreationAttributes } from "../models/Celebrity";
import ClubMembership, { ClubMembershipCreationAttributes } from "../models/ClubMembership";
import DefaultClubMembership from "../models/DefaultClubMembership";


export class CelebrityService {
 
  static async createCelebrity(
    celebrityData: Omit<CelebrityCreationAttributes, 'clubMemberships' | 'isConfirmed'>,
    isConfirmed: boolean
  ): Promise<Celebrity> {
    try {
      const celebrity = await Celebrity.create({ ...celebrityData, isConfirmed });
  
      const defaultMemberships = await DefaultClubMembership.findAll();
  
      for (const membership of defaultMemberships) {
        const newMembershipData: ClubMembershipCreationAttributes = {
          ...membership.toJSON(), // ensures you're copying raw data
          celebrityId: celebrity.id,
        };

        delete newMembershipData.id;
  
        await ClubMembership.create(newMembershipData);
      }
  
      return celebrity;
    } catch (error) {
      throw new Error(`Error creating celebrity: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  

  /**
   * Get all celebrities
   * @param includeChats Whether to include associated chats
   * @returns Array of all celebrities
   */
  static async getAllCelebrities(): Promise<Celebrity[]> {
    try {
      
      const celebrities = await Celebrity.findAll();
      return celebrities;
    } catch (error) {
      throw new Error(`Error getting all celebrities: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get celebrity by ID
   * @param id Celebrity ID
   * @param includeChats Whether to include associated chats
   * @returns Celebrity if found, null otherwise
   */
  static async getCelebrityById(id: number

  ): Promise<Celebrity | null> {
    try {
      const options: any = {
        where: { id }
      };
      
   
      
      const celebrity = await Celebrity.findOne(options);
      return celebrity;
    } catch (error) {
      throw new Error(`Error getting celebrity by ID: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Update celebrity by ID
   * @param id Celebrity ID
   * @param updateData Data to update (can include new image as base64 string)
   * @returns Updated celebrity
   */
  static async updateCelebrity(
    id: number,
    updateData: Partial<CelebrityAttributes>
  ): Promise<Celebrity | null> {
    try {
      const celebrity = await Celebrity.findByPk(id);
      if (!celebrity) {
        return null;
      }

      await celebrity.update(updateData);
      return celebrity;
    } catch (error) {
      throw new Error(`Error updating celebrity: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Update celebrity image by ID
   * @param id Celebrity ID
   * @param image Base64 encoded image string
   * @returns Updated celebrity
   */
  static async updateCelebrityImage(id: number, image: string): Promise<Celebrity | null> {
    try {
      const celebrity = await Celebrity.findByPk(id);
      if (!celebrity) {
        return null;
      }

      await celebrity.update({ image });
      return celebrity;
    } catch (error) {
      throw new Error(`Error updating celebrity image: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Get confirmed celebrities
   * @returns Array of confirmed celebrities
   */
  static async getConfirmedCelebrities(): Promise<Celebrity[]> {
    try {
      const celebrities = await Celebrity.findAll({
        where: { isConfirmed: true }
      });
      return celebrities;
    } catch (error) {
      throw new Error(`Error getting confirmed celebrities: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  static async deleteCelebrity(id:number){
    try{
      const celebrity = await Celebrity.findByPk(id);
      if(!celebrity){
        return null;
      }
      await celebrity.destroy();
    }catch(error:any){
      throw new Error(`Error deleting celebrity: ${error instanceof Error ? error.message : String(error)
      }`);
    }

  }
}