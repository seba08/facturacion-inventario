import { Router } from "express";
import { userAuth } from "../controllers/auth.js";


const authRouter = Router();


authRouter.post("/", userAuth)


export default authRouter;