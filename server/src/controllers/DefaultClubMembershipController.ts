import { Request, Response } from 'express';
import DefaultClubMembershipService from '../services/DefaultClubMembershipService';

class DefaultClubMembershipController {
  
  // Create a single membership
  static async createMembership(req: Request, res: Response): Promise<void> {
    try {
      const { tier, features, price } = req.body;
      const membershipData = { tier, features, price };
      
      const newMembership = await DefaultClubMembershipService.createMembership(membershipData);
      res.status(201).json(newMembership);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  // Create multiple memberships
  static async createBulkMemberships(req: Request, res: Response): Promise<void> {
    try {
      const membershipsData = req.body;  // Expecting an array of membership data
      const newMemberships = await DefaultClubMembershipService.createBulkMemberships(membershipsData);
      res.status(201).json(newMemberships);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  // Get all memberships
  static async getAllMemberships(req: Request, res: Response): Promise<void> {
    try {
      const filter = req.query;  // Filter parameters can come as query params
      const memberships = await DefaultClubMembershipService.getAllMemberships(filter);
      res.status(200).json(memberships);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  // Update a single membership
  static async updateMembership(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;  // Expecting the ID as a route parameter
      const updates = req.body;   // Expecting the update data as the request body

      const updatedMembership = await DefaultClubMembershipService.updateMembership(Number(id), updates);

      if (!updatedMembership) {
        res.status(404).json({ message: 'Membership not found' });
        return;
      }

      res.status(200).json(updatedMembership);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }

  // Delete a membership
  static async deleteMembership(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletedCount = await DefaultClubMembershipService.deleteMembership(Number(id));

      if (deletedCount === 0) {
        res.status(404).json({ message: 'Membership not found' });
        return;
      }

      res.status(200).json({ message: 'Membership deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
  }
}

export default DefaultClubMembershipController;
