import AppliedMeetGreet from "../models/AppliedMeetGreet";
import { Op } from "sequelize";
import { AppliedMeetGreetCreationAttributes } from "../models/AppliedMeetGreet";
import Payment from "../models/Payment";
import { Celebrity } from "../models/Celebrity";

class AppliedMeetGreetService {
  // Create a new Meet & Greet application
  static async create(data: AppliedMeetGreetCreationAttributes) {
    return await AppliedMeetGreet.create(data);
  }



static async getAppliedMeetGreetsGroupedByCelebrity() {
  const appliedMeetGreets = await AppliedMeetGreet.findAll({
    include: [
      {
        model: Celebrity,
        as: "celebrity",
         // Assume you have a name for each celebrity
      },
      {
        model: Payment,
        as: "payments",
      },
    ],
  });

  // Group the applied meet greets by celebrity
  const groupedByCelebrity: { [key: number]: AppliedMeetGreet[] } = {};
  appliedMeetGreets.forEach((meetGreet) => {
    const celebrityId = meetGreet.celebrityId;
    if (!groupedByCelebrity[celebrityId]) {
      groupedByCelebrity[celebrityId] = [];
    }
    groupedByCelebrity[celebrityId].push(meetGreet);
  });

  return groupedByCelebrity;
}


  // Get all Meet & Greet applications
  static async getAll() {
    return await AppliedMeetGreet.findAll({ include: ["fan", "celebrity"] });
  }

  // Get a single Meet & Greet application by ID
  static async getById(id: number) {
    return await AppliedMeetGreet.findByPk(id, { include: ["fan", "celebrity"] });
  }

  // Update an existing Meet & Greet application
  static async update(id: number, data: Partial<AppliedMeetGreetCreationAttributes>) {
    const meetGreet = await AppliedMeetGreet.findByPk(id);
    if (!meetGreet) throw new Error("Meet & Greet application not found");
    return await meetGreet.update(data);
  }

  // Delete a Meet & Greet application
  static async delete(id: number) {
    const meetGreet = await AppliedMeetGreet.findByPk(id);
    if (!meetGreet) throw new Error("Meet & Greet application not found");
    await meetGreet.destroy();
    return { message: "Meet & Greet application deleted successfully" };
  }

  // Get Meet & Greet applications by status
  static async getByStatus(status: "Active" | "Pending" | "Expired" | "Unpaid") {
    return await AppliedMeetGreet.findAll({
      where: { status },
      include: ["fan", "celebrity"],
    });
  }
}

export default AppliedMeetGreetService
