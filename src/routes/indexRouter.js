import { Router } from "express";
import userRouter from "./userRouter.js";
import productsRouter from "./productsRouter.js";
import transactionsRouter from "./transactionsRouter.js";

const router = Router();

router.use(productsRouter);
router.use(userRouter);
router.use(transactionsRouter);

export default router;
