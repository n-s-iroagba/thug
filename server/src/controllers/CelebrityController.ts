import { Request, Response } from "express";
import { CelebrityService } from "../services/CelebrityService";
import { CelebrityCreationAttributes } from "../models/Celebrity";

export class CelebrityController {
  /**
   * Create a celebrity with optional image and default memberships
   * Image is uploaded using multer and stored in req.file
   */
  static async createCelebrity(req: Request, res: Response):Promise<any> {
    try {
      const {
        stageName,
        firstName,
        surname,
        bio
      } = req.body;

      const image = req.file ? req.file.path : "";

      const celebrityData: Omit<CelebrityCreationAttributes, "clubMemberships" | "isConfirmed"> = {
        stageName,
        firstName,
        surname,
        bio,
        image
      };

      const newCelebrity = await CelebrityService.createCelebrity(celebrityData, true); // You can modify the isConfirmed flag logic

      return res.status(201).json(newCelebrity);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req: Request, res: Response):Promise<any> {
    try {
      const celebrities = await CelebrityService.getAllCelebrities();
      res.json(celebrities);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response):Promise<any> {
    try {
      const id = Number(req.params.id);
      const celebrity = await CelebrityService.getCelebrityById(id);
      if (!celebrity) return res.status(404).json({ message: "Celebrity not found" });
      res.json(celebrity);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response):Promise<any> {
    try {
      const id = Number(req.params.id);
      const image = req.file ? req.file.path : undefined;
      const updateData = { ...req.body, ...(image && { image }) };

      const updated = await CelebrityService.updateCelebrity(id, updateData);
      if (!updated) return res.status(404).json({ message: "Celebrity not found" });
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response):Promise<any> {
    try {
      const id = Number(req.params.id);
      const result = await CelebrityService.deleteCelebrity(id);
      if (result === null) return res.status(404).json({ message: "Celebrity not found" });
      res.json({ message: "Celebrity deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
