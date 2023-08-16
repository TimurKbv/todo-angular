
import {  findUserByUserId, findUserByUserName, getAllUsers } from "../controllers/user.controller";
import { Router } from "express";
import express from 'express'
import { get, startCase } from 'lodash';
import { verifyToken } from "../middleware/verify.middleware";


// Erstelle neue Router Instanz
const userRouter = Router();
userRouter.use(verifyToken)

userRouter.route('/')
    .get(getAllUsers)

     
userRouter.route('/user')
    .get(findUserByUserId)


export default userRouter;