import { signin, signup } from "../controllers/usersController.js";
import { Router } from "express";
import schemaAuth from "../schemas/auth.js";
import schemaUser from "../schemas/users.js";
import validateSchema from "../middlewares/validateSchema.js";


const userRouter = Router();

userRouter.post("/signin", validateSchema(schemaAuth), signin);

userRouter.post("/signup", validateSchema(schemaUser), signup);

export default userRouter;