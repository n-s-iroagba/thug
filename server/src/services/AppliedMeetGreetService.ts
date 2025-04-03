import AppliedMeetGreet from "../models/AppliedMeetGreet";
import { Op } from "sequelize";
import { AppliedMeetGreetCreationAttributes } from "../models/AppliedMeetGreet";

class AppliedMeetGreetService {
  // Create a new Meet & Greet application
  async create(data: AppliedMeetGreetCreationAttributes) {
    return await AppliedMeetGreet.create(data);
  }

  // Get all Meet & Greet applications
  async getAll() {
    return await AppliedMeetGreet.findAll({ include: ["fan", "celebrity"] });
  }

  // Get a single Meet & Greet application by ID
  async getById(id: number) {
    return await AppliedMeetGreet.findByPk(id, { include: ["fan", "celebrity"] });
  }

  // Update an existing Meet & Greet application
  async update(id: number, data: Partial<AppliedMeetGreetCreationAttributes>) {
    const meetGreet = await AppliedMeetGreet.findByPk(id);
    if (!meetGreet) throw new Error("Meet & Greet application not found");
    return await meetGreet.update(data);
  }

  // Delete a Meet & Greet application
  async delete(id: number) {
    const meetGreet = await AppliedMeetGreet.findByPk(id);
    if (!meetGreet) throw new Error("Meet & Greet application not found");
    await meetGreet.destroy();
    return { message: "Meet & Greet application deleted successfully" };
  }

  // Get Meet & Greet applications by status
  async getByStatus(status: "Active" | "Pending" | "Expired" | "Unpaid") {
    return await AppliedMeetGreet.findAll({
      where: { status },
      include: ["fan", "celebrity"],
    });
  }
}

export default new AppliedMeetGreetService();
