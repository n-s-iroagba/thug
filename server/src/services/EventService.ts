import {Event} from "../models/Event";
import { EventCreationAttributes } from "../models/Event";

class EventService {
  // Create a new event
  static async create(data: EventCreationAttributes) {
    return await Event.create(data);
  }

  // Get all events
  static async getAll() {
    return await Event.findAll({ include: ["celebrity"] });
  }

  // Get a single event by ID
  static async getById(id: number) {
    return await Event.findByPk(id, { include: ["celebrity"] });
  }

  // Update an existing event
  static async update(id: number, data: Partial<EventCreationAttributes>) {
    const event = await Event.findByPk(id);
    if (!event) throw new Error("Event not found");
    return await event.update(data);
  }

  // Delete an event
  static async delete(id: number) {
    const event = await Event.findByPk(id);
    if (!event) throw new Error("Event not found");
    await event.destroy();
    return { message: "Event deleted successfully" };
  }

  // Get events by status
  static async getByStatus(status: "Active" | "Pending" | "Expired" | "Unpaid") {
    return await Event.findAll({
      where: { status },
      include: ["celebrity"],
    });
  }
}

export default EventService;
