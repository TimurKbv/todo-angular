
import {  findUserByUserId, getAllUsers } from "../controllers/user.controller";
import { Router } from "express";

// Erstelle neue Router Instanz
const userRouter = Router();

userRouter.route('/')
    .get(getAllUsers)


userRouter.route('/:username')
    .get(findUserByUserId)




export default userRouter;