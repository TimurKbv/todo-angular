import express from 'express';

import * as UserModel from "../model/user.model";
import { get } from 'lodash';



export async function getAllUsers(req: express.Request, res: express.Response) {
    res.send(await UserModel.getUsers());
}


export async function findUserByUserId(req: express.Request, res: express.Response) {
    const username = req.params.username;

    try {
        let user = await UserModel.findUserByUsername(username);
        console.log(user);

        res.send({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(error.code).send({
            success: false,
            message: error.message
        })
    }
}