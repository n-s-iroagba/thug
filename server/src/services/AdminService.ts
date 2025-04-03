import { Role } from "../enums/Role";
import { Admin } from "../models/Admin";
import { User } from "../models/User";
import { MailService } from "./MailService";
import { NotificationService } from "./NotificationService";
import { UserService } from "./UserService";



export class AdminService {

  static async addAdmin(adminData:{
    username: string;
    email: string;
    whatsAppNumber: string;
    password: string;
} ){
    
        const {
          username,
          email,
          password,
          whatsAppNumber
        }= adminData
        if (
          !username ||
          !email ||
          !password ||
          !whatsAppNumber
        ) {
          throw new Error("Missing required fields");
        }
    const user = await UserService.createUser(Role.ADMIN,  {email,password,whatsAppNumber})
    const admin = await Admin.create({
     username, userId: user.id,
  
    })
    await MailService.sendVerificationEmail(user);
    return admin;

  }




  static async notifyAdmin(adminId: number, notificationData: { subject: string, message?: string }): Promise<void> {
    try {
      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        throw new Error("Admin not found");
      }

      const { subject, message = "You have a new notification" } = notificationData;

      await NotificationService.publishNotification(adminId, subject, message);
    
      console.log(`Admin ${adminId} notified successfully`);

    } catch (error:any) {
      console.error(`Error notifying admin ${adminId}: ${error.message}`);
      throw new Error(`Failed to notify admin: ${error.message}`);
    }
  }
}
