import Payment from "../models/Payment";
import { PaymentCreationAttributes } from "../models/Payment";

class PaymentService {
  // Create a new payment
  async create(data: PaymentCreationAttributes) {
    return await Payment.create(data);
  }

  // Get all payments
  async getAll() {
    return await Payment.findAll();
  }

  // Get a single payment by ID
  async getById(id: number) {
    return await Payment.findByPk(id);
  }

  // Update an existing payment
  async update(id: number, data: Partial<PaymentCreationAttributes>) {
    const payment = await Payment.findByPk(id);
    if (!payment) throw new Error("Payment not found");
    return await payment.update(data);
  }

  // Delete a payment
  async delete(id: number) {
    const payment = await Payment.findByPk(id);
    if (!payment) throw new Error("Payment not found");
    await payment.destroy();
    return { message: "Payment deleted successfully" };
  }

  // Get payments by item type (e.g., Charity, Event, etc.)
  async getByItemType(itemType: "ClubMembership" | "Charity" | "MeetGreet" | "Event") {
    return await Payment.findAll({
      where: { itemType },
    });
  }

  // Get payments by fan ID
  async getByFanId(fanId: number) {
    return await Payment.findAll({
      where: { fanId },
    });
  }
}

export default new PaymentService();
