import express from "express";
import multer from "multer";
import militaryLeaderController from "../Controllers/MilitaryLeaderController";

const router = express.Router();

router.get("/", militaryLeaderController.getAll);

router.get("/filters", militaryLeaderController.getFilters);
router.post("/filter", militaryLeaderController.getAndFilter);

router.post("/", militaryLeaderController.add);
const upload = multer({ dest: "uploads/ml/" });
router.post(
    "/:id",
    upload.single("image"),
    militaryLeaderController.uploadImage
);
router.patch("/:id", militaryLeaderController.update);
router.delete("/:id", militaryLeaderController.delete);

export default router;
