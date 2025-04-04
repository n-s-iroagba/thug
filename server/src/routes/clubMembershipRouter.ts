import express from "express";
import ClubMembershipController from "../controllers/ClubMembershipController";

const router = express.Router();

// Create a new club membership
router.post("/memberships", ClubMembershipController.createMembership);

// Update an existing club membership
router.put("/memberships", ClubMembershipController.updateMembership);

// Get all club memberships grouped by celebrity
router.get("/memberships/grouped-by-celebrity", ClubMembershipController.getAllClubMembershipsGroupedByCelebrity);

export default router;
