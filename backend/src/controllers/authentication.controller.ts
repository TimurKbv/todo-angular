import express from "express"
import * as UserModel from '../model/user.model'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


export const register = async (req: express.Request, res: express.Response) => {
    let body = req.body;

    // Ueberschreibe password-Property im body mit dem Hash des Passworts
    body.password = bcrypt.hashSync(body.password, 10);
    console.log(body);
    
    try {
        // Fuehre Model-Funktion zum Einfuegen eines neuen Users aus
        const user = await UserModel.createUser(body);

        // Sende Erfolgsmeldung zurueck
        res.send({success: true, user: user});

    } catch (error) {
        console.log(error);

        res.status(error.code).send({
            success: false,
            message: error.message,
            code: error.code
        });
    }
}


// Controller Funktion zum Einloggen bestehender User
export async function login(req: express.Request, res: express.Response) {
    // extrahiere Properties aus dem body
    let { username, password } = req.body;

    // Hole entsprechenden User per username aus der DB
    let currUser = await UserModel.findUserByUsername(username);

    // Wenn user nicht gefunden wurde
    if (currUser === null) {
        // Sende 401 (UNAUTHORIZED) mit Nachricht
        res.status(401).send({
            success: false,
            message: 'Incorrect username or password'
        });
        // early return
        return;
    }
    console.log(currUser);
    
    // Vergleiche uebermitteltes password mit dem gehashten password aus der DB
    if (bcrypt.compareSync(password, currUser.password)) {
        // Erstelle neuen JWT Token mit payload und Verfall nach einer Stunde (60 Minuten * 60 Sekunden)
        let token = jwt.sign({ userId: currUser._id, username: currUser.username, email: currUser.email }, process.env.SECRET, { expiresIn: 60 * 60 });

        let user = {
            id: currUser._id,
            username: currUser.username,
            email: currUser.email,
            token: token
        }
        // Sende Erfolgsnachricht sowie neuen Token zurueck
        res.send({
            success: true,
            user
        });

    } else {
        // Passwort falsch -> Sende Fehlermeldung zurueck
        res.status(401).send({
            success: false,
            message: 'Incorrect username or password'
        });
    }
}