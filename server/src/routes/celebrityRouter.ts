import { Router } from "express";
import multer from "multer";
import { CelebrityController } from "../controllers/CelebrityController";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.get("/", CelebrityController.getAll);
router.get("/:id", CelebrityController.getById);
router.post("/", upload.single("image"), CelebrityController.createCelebrity);
router.put("/:id", upload.single("image"), CelebrityController.update);
router.delete("/:id", CelebrityController.delete);

export default router;
