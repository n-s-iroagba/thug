import { Request, Response } from "express";
import { AdminService } from "../services/AdminService";

export class AdminController {
  static async addAdmin(req: Request, res: Response): Promise<any> {
    try {
      
      const admin = await AdminService.addAdmin(req.body);
      return res.status(201).json(admin);
    } catch (error: any) {
      console.error(error)
      return res.status(500).json({ error: error.message });
    }
  }

}
