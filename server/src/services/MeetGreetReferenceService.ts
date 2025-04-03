import MeetGreetReference, { 
    MeetGreetReferenceAttributes, 
    MeetGreetReferenceCreationAttributes 
  } from "../models/MeetGreetReference";
  
  export class MeetGreetReferenceService {
    
    /** 
     * Create a new meet & greet reference
     */
    static async create(data: MeetGreetReferenceCreationAttributes): Promise<MeetGreetReference> {
      return await MeetGreetReference.create(data);
    }
  
    /**
     * Find a single meet & greet reference by ID
     */
    static async findById(id: number): Promise<MeetGreetReference | null> {
      return await MeetGreetReference.findByPk(id);
    }
  
    /**
     * Get all meet & greet references
     */
    static async find(): Promise<MeetGreetReference|null> {
      return await MeetGreetReference.findOne();
    }
  
    /**
     * Update a meet & greet reference by ID
     */
    static async update(id: number, data: Partial<MeetGreetReferenceCreationAttributes>): Promise<[number, MeetGreetReference[]]> {
      return await MeetGreetReference.update(data, {
        where: { id },
        returning: true, // Ensures the updated record is returned (PostgreSQL-specific)
      });
    }
  
    /**
     * Delete a meet & greet reference by ID
     */
    static async delete(id: number): Promise<number> {
      return await MeetGreetReference.destroy({ where: { id } });
    }
  }
  
  export default MeetGreetReferenceService;
  