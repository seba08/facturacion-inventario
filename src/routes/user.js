import { Router } from "express";
import {  
    getUser, 
    getUsers, 
    postUser, 
    putUser,
    deleteUser } from "../controllers/user.js";



const userRouter = Router();


userRouter.get("/:id", getUser)
userRouter.get("/", getUsers)
userRouter.post("/", postUser)
userRouter.put("/:id", putUser)
userRouter.delete("/:id", deleteUser)

export default userRouter;