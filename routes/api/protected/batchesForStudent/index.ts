import express from "express";
import errorHandler from "../../../../middleware/errorHandler";

import {
  getAllController,
  getById,
} from "../../../../controller/protected/batchesForStudent";
const router = express.Router();

router.get("/", errorHandler(getAllController));

router.get("/:id", errorHandler(getById));

export default router;
