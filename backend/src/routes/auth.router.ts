
import { login, register } from "../controllers/authentication.controller";
import { Router } from "express";

// Erstelle neue Router Instanz
const authRouter = Router();

// Routen Definition fuer /register
authRouter.route('/register')
    .post(register);

// Routen Definition fuer /login
authRouter.route('/login')
    .post(login);




export default authRouter;