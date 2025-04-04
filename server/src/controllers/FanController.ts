import { Request, Response } from "express";
import { FanService } from "../services/FanService";
import { MessageService } from "../services/MessageService";
import { CelebrityService } from "../services/CelebrityService";
import  EventService  from "../services/EventService";
import AppliedMeetGreetService from "../services/AppliedMeetGreetService";
import ClubMembershipSubscription from "../models/ClubMembershipSubscription";
import { ClubMembershipSubscriptionService } from "../services/ClubMembershipSubscriptionService";

export class FanController {

  static async createFanAndBooking(req: Request, res: Response): Promise<any> {
    try {
        let { fan, contactType, message, celebrity, user } = req.body;

        console.log("Received Request Body:", req.body);

        try {
            fan = typeof fan === "string" ? JSON.parse(fan) : fan;
            user = typeof user === "string" ? JSON.parse(user) : user;
            celebrity = typeof celebrity === "string" ? JSON.parse(celebrity) : celebrity;
        } catch (error) {
            return res.status(400).json({ error: "Invalid JSON format in request body" });
        }

        if (!celebrity?.id) {
            console.log("No celebrity ID found, creating new...");
            celebrity = await CelebrityService.createCelebrity(celebrity,false);
        }else {
          celebrity = await CelebrityService.getCelebrityById(celebrity.id)
        }

        console.log("Fan data:", fan);
        console.log("User data:", user);
        console.log("Celebrity data:", celebrity);

        // Create Fan
        const { token, fanId } = await FanService.createFan(fan, user);
    

     
        switch (contactType) {
            case "event":
                await EventService.create({...req.body.event,fanId,celebrityId:celebrity.id});
                break;
            case "text":
                await MessageService.postMessage({ content: req.body.message,fanId,celebrityId:celebrity.id });
                break;
            case "meet":
                await AppliedMeetGreetService.create({...req.body.meet,fanId,celebrityId:celebrity.id});
                break;
            case "club":
                await ClubMembershipSubscriptionService.createSubscription({...req.body.club,fanId,celebrityId:celebrity.id});
                break;
            default:
                throw new Error( "Invalid contact type" );
        }

        return res.status(201).json(token);
    } catch (error: any) {
        console.error("Error in createFanAndBooking:", error);
        return res.status(500).json({ error: error.message });
    }
}
static async createFan(req: Request, res: Response):Promise<any> {
  try {
    const {fan,user} = req.body;
    const { token,  } = await FanService.createFan(fan, user);

    return res.status(201).json(token);

    res.status(201).json(token);
  } catch (error) {
    console.error("Error creating fan:", error);
    res.status(500).json({ message: "Failed to create fan" });
  }
}
  static async getAllFans(req: Request, res: Response): Promise<any> {
    try {
      const fans = await FanService.getAllFans();
      return res.status(200).json(fans);
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }


  static async getFanById(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id, 10);
      const fan = await FanService.getFanById(id);
      if (!fan) {
        throw new Error("Fan not found");
      }
      return res.status(200).json(fan);
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateFan(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id, 10);
      const updates = req.body;
      const updatedFan = await FanService.updateFan(id, updates);
      if (!updatedFan) {
        throw new Error("Fan not found");
      }
      return res.status(200).json({ message: "Fan updated successfully", fan: updatedFan });
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteFan(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await FanService.deleteFan(id);
      if (!success) {
        throw new Error("Fan not found");
      }
      return res.status(200).json({ message: "Fan deleted successfully" });
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }

}
