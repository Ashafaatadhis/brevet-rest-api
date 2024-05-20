import express from "express";
import errorHandler from "../../../../middleware/errorHandler";

import {
  addPriceValidator,
  editPriceValidator,
} from "../../../../utils/validator";
import {
  addPriceController,
  deletePriceController,
  editPriceController,
  getCurrentPriceController,
  getPriceController,
} from "../../../../controller/protected/price";
const router = express.Router();

router.post("/", addPriceValidator, errorHandler(addPriceController));

router.put("/:id", editPriceValidator, errorHandler(editPriceController));
router.delete("/:id", errorHandler(deletePriceController));
router.get("/", errorHandler(getPriceController));
router.get("/current", errorHandler(getCurrentPriceController));

export default router;
