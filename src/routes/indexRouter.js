import { Router } from "express";
import userRouter from "./userRouter.js";
import productsRouter from "./productsRouter.js";

const router = Router();

router.use(productsRouter);
router.use(userRouter);

export default router;
