import { Request, Response } from "express";
import { FanService } from "../services/FanService";
import { MessageService } from "../services/MessageService";
import { CelebrityService } from "../services/CelebrityService";
import JobService from "../services/JobService";

export class FanController {

  static async createFanAndBooking(req: Request, res: Response): Promise<any> {
    let { fan, contactType, message, celebrity, user } = req.body;

    console.log(req.body);
  
    fan = JSON.parse(fan);
    user = JSON.parse(user);
    celebrity = JSON.parse(celebrity);


    try {
        if (!celebrity.id) {
            console.log("No celebrity ID found, creating new...");
            celebrity = await CelebrityService.createCelebrity(celebrity);
        }

        console.log("Fan data:", fan);
        console.log("User data:", user);
        console.log("Celebrity data:", celebrity);

        // Create Fan, Job, Chat
        const { token, fanId } = await FanService.createFan(fan, user);
        const job = await JobService.createJob({ fanId, celebrityId: celebrity.id });
    

        await MessageService.postMessage({
    
            content: message,
            jobId: job.id,
            isSeen: false,
         
        });

        return res.status(201).json(token);
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: error.message });
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
