import express from 'express';

import * as UserModel from "../model/user.model";
import { get, startCase } from 'lodash';



export async function getAllUsers(req: express.Request, res: express.Response) {
    res.send(await UserModel.getUsers());
}


export async function findUserByUserName(req: express.Request, res: express.Response) {
    const username = req.params.username;
    console.log('Find User by Name =>>>', username);
    

    try {
        let user = await UserModel.findUserByName(username);
        console.log(user);

        let currUser = {
            _id: user._id,
            username: user.username,
            email: user.email
        }

        res.send({
            success: true,
            user: currUser
        });
    } catch (error) {
        res.status(error.code).send({
            success: false,
            message: error.message
        })
    }
}

export async function findUserByUserId(req: express.Request, res: express.Response) {
    const userId = get(req, 'tokenPayload.userId');
    console.log('start to Find user by ID: ', userId);
    
    console.log('User id =>>>>> ', userId);
    
    try {
        let user = await UserModel.getUserById(userId);
        console.log('User =>>> ', user);

        let currUser = {
            _id: user._id,
            username: user.username,
            email: user.email
        }

        res.send({
            success: true,
            user: currUser
        });
    } catch (error) {
        res.status(error.code).send({
            success: false,
            message: error.message
        });
    }
}