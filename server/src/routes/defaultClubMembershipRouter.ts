import express from 'express';
import DefaultClubMembershipController from '../controllers/DefaultClubMembershipController';

const router = express.Router();

// Route to create a single membership
router.post('/', DefaultClubMembershipController.createMembership);

// Route to create multiple memberships
router.post('/bulk', DefaultClubMembershipController.createBulkMemberships);

// Route to get all memberships (with optional filters)
router.get('/all', DefaultClubMembershipController.getAllMemberships);

// Route to update a specific membership
router.put('/:id', DefaultClubMembershipController.updateMembership);

// Route to delete a specific membership
router.delete('/delete/:id', DefaultClubMembershipController.deleteMembership);

export default router;
