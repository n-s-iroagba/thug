import { Role } from "../enums/Role";
import AppliedMeetGreet from "../models/AppliedMeetGreet";
import ClubMembershipSubscription from "../models/ClubMembershipSubscription";
import { Fan, FanCreationAttributes } from "../models/Fan";
import Message from "../models/Message";
import { User } from "../models/User";
import { MailService } from "./MailService";
import { UserService } from "./UserService";
import Event from "../models/Event";
import path from "path";
import fs from "fs";
import { Celebrity } from "../models/Celebrity";

export class FanService {
  static ChatService: any;
  static MessageService: any;

      static async createFan(fanData: Partial<Fan>,userData: Partial<User>): Promise<{token:string|null, fanId:number}> {
          const {
            firstName,
            surname,
            countryOfResidence,
            dateOfBirth,
            gender,
            occupation,
          } = fanData;
        const {
          email,
          password,
          whatsAppNumber,
        }= userData
          if (
            !firstName ||
            !surname ||
            !email||
            !password ||
            !gender||
            !whatsAppNumber ||
            !countryOfResidence ||
            !dateOfBirth||
            !occupation
          ) {
            throw new Error("Missing user fields  required in createFan Service function");
          }
      try{
          const user = await UserService.createUser(Role.FAN, userData as {email:string, password:string,whatsAppNumber:string})
    
         const fan = await Fan.create({
           firstName,
           surname,
           countryOfResidence,
           dateOfBirth,
           userId: user.id,
           gender,
           occupation,
         })
  //because of how special their message was
    
        // await MailService.sendVerificationEmail(user);
        return {token:user.verificationToken,fanId:fan.id};
      }catch(e:any){
        console.error(e)
        throw new Error("Error creating fan in createFan Service function")
      }
      }

 
      
        // Get all fans including associated data
        static async getAllFans(): Promise<Fan[]> {
          return Fan.findAll({
            include: [
              { model: AppliedMeetGreet, as: "appliedMeetGreets" },
              { model: ClubMembershipSubscription, as: "clubMemberships" },
              {
                model: Message,
                as: "messages",
                include: [{ model: Celebrity, as: "celebrity" }],
              },
              { model: Event, as: "events" },
              { model: User, as: "user" },
            ],
          });
        }
        
      
        // Get a single fan by ID
        static async getFanById(id: number): Promise<Fan | null> {
          return Fan.findByPk(id, {
            include: [
              { model: AppliedMeetGreet, as: "meetGreets" },
              { model: ClubMembershipSubscription, as: "clubSubscriptions" },
              { model: Message, as: "messages", include: [{ model: Celebrity, as: "celebrity" }] },

              { model: Event, as: "events" },
              { model: User, as: "user" },
            ],
          });
        }
      
        // Update a fan
        static async updateFan(
          id: number,
          updates: Partial<FanCreationAttributes>,
          profileImage?: Express.Multer.File
        ): Promise<Fan | null> {
          const fan = await Fan.findByPk(id);
          if (!fan) return null;
      
          // If a new profile image is provided
          if (profileImage) {
            const imagePath = `/uploads/${profileImage.filename}`;
      
            // Optionally remove the old image if it exists
            if (fan.profilePicture) {
              const oldPath = path.join(__dirname, "..", "..", fan.profilePicture);
              if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
              }
            }
      
            updates.profilePicture = imagePath;
          }
      
          await fan.update(updates);
          return fan;
        }
      
      
        // Delete a fan
        static async deleteFan(id: number): Promise<boolean> {
          const deleted = await Fan.destroy({ where: { id } });
          return deleted > 0;
        }
      }
      