import { Router } from "express";
import { postPurchase } from "../controllers/transactionsController.js";
import validateAuth from "../middlewares/validateAuth.js";
import validateSchema from "../middlewares/validateSchema.js";
import schemaPurchase from "../schemas/purchase.js";

const transactionsRouter = Router();
transactionsRouter.post(
  "/checkout",
  validateAuth,
  validateSchema(schemaPurchase),
  postPurchase
);

export default transactionsRouter;
