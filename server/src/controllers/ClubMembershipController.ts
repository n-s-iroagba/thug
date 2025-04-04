import { Request, Response } from "express";
import ClubMembershipService from "../services/ClubMembershipService";
import { ClubMembershipCreationAttributes, ClubMembershipAttributes } from "../models/ClubMembership";

export class ClubMembershipController {

  /**
   * Create a new club membership
   */
  static async createMembership(req: Request, res: Response): Promise<void> {
    const membershipData: ClubMembershipCreationAttributes = req.body;

    try {
      const membership = await ClubMembershipService.createMembership(membershipData);
      res.status(201).json(membership);
    } catch (error) {
      res.status(500).json({
        message: `Error creating club membership: ${error instanceof Error ? error.message : String(error)}`
      });
    }
  }

  /**
   * Update an existing club membership
   */
  static async updateMembership(req: Request, res: Response): Promise<void> {
    const updateData: Partial<ClubMembershipAttributes> = req.body;

    try {
      const updatedMembership = await ClubMembershipService.updateMembership(updateData);
      
      if (!updatedMembership) {
        res.status(404).json({ message: "Membership not found" });
        return;
      }

      res.status(200).json(updatedMembership);
    } catch (error) {
      res.status(500).json({
        message: `Error updating club membership: ${error instanceof Error ? error.message : String(error)}`
      });
    }
  }

  /**
   * Get all club memberships grouped by celebrity
   */
  static async getAllClubMembershipsGroupedByCelebrity(req: Request, res: Response): Promise<void> {
    try {
      const groupedMemberships = await ClubMembershipService.getAllClubMembershipsGroupedByCelebrity();
      res.status(200).json(groupedMemberships);
    } catch (error) {
      res.status(500).json({
        message: `Error fetching and grouping memberships: ${error instanceof Error ? error.message : String(error)}`
      });
    }
  }
}

export default ClubMembershipController;
