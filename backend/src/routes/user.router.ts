
import {  findUserByUserId, findUserByUserName, getAllUsers } from "../controllers/user.controller";
import { Router } from "express";

// Erstelle neue Router Instanz
const userRouter = Router();

userRouter.route('/')
    .get(getAllUsers)


userRouter.route('/:username')
    .get(findUserByUserName)

userRouter.route('/user')
    .get(findUserByUserId)


export default userRouter;