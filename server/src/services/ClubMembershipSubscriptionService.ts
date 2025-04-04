
import ClubMembershipSubscription, { ClubMembershipSubscriptionCreationAttributes } from "../models/ClubMembershipSubscription";
import Payment from "../models/Payment";

// const getSubscriptionsGroupedByCelebrity = async (req: Request, res: Response) => {
//   try {
//     // Fetch subscriptions with related membership and celebrity
//     const subscriptions = await ClubMembershipSubscription.findAll({
//       include: [
//         {
//           model: ClubMembership,
//           as: 'membership',
//           include: [
//             {
//               model: Celebrity,
//               as: 'celebrity',
//             }
//           ],
//         }
//       ],
//     });



//     // Group subscriptions by celebrityId
//     const groupedSubscriptions = subscriptions.reduce((acc: any, subscription: any) => {
//       const celebrityId = subscription.membership?.celebrityId;
//       if (celebrityId) {
//         if (!acc[celebrityId]) {
//           acc[celebrityId] = {
//             celebrity: subscription.membership?.celebrity,
//             subscriptions: []
//           };
//         }
//         acc[celebrityId].subscriptions.push(subscription);
//       }
//       return acc;
//     }, {});

//     res.json(groupedSubscriptions);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching subscriptions' });
//   }
// };

export class ClubMembershipSubscriptionService {
  static async createSubscription(data: ClubMembershipSubscriptionCreationAttributes) {
    return await ClubMembershipSubscription.create(data);
  }

  static async getSubscriptions() {
    return await ClubMembershipSubscription.findAll();
  }

  static async getSubscriptionById(id: number) {
    return await ClubMembershipSubscription.findByPk(id);
  }

  static async updateSubscription(id: number, data: any) {
    const [updated] = await ClubMembershipSubscription.update(data, { where: { id } });
    return updated > 0;
  }

  static async deleteSubscription(id: number) {
    const deleted = await ClubMembershipSubscription.destroy({ where: { id } });
    return deleted > 0;
  }
}

export class PaymentService {
  static async createPayment(data: any) {
    return await Payment.create(data);
  }

  static async getPayments() {
    return await Payment.findAll();
  }

  static async getPaymentById(id: number) {
    return await Payment.findByPk(id);
  }

  static async updatePayment(id: number, data: any) {
    const [updated] = await Payment.update(data, { where: { id } });
    return updated > 0;
  }

  static async deletePayment(id: number) {
    const deleted = await Payment.destroy({ where: { id } });
    return deleted > 0;
  }
}
