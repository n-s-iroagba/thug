import { Router } from "express";
import { AdminController } from "../controllers/AdminController";

const adminRouter = Router();
adminRouter.post("/", AdminController.addAdmin);


export default adminRouter;
