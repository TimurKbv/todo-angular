import express from 'express';
import jwt from 'jsonwebtoken';
import { get, merge} from 'lodash';


// Middleware-Funktion zum Validieren von Tokens im Header
export function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    // Wenn Authorization im Header nicht gesetzt, breche ab und sende Fehler
    if (!req.headers.authorization) return res.status(401).send({success: false, message: 'Token missing'});
    // if (!req.cookies.access_token) return res.status(401).send({success: false, message: 'Token missing'});
    
    // Extrahiere Token aus dem authorization Feld im HTTP Request Header
    let token = req.headers.authorization.split(' ')[1];
    // let token = req.cookies.access_token.split(' ')[1];

    
    // Verifiziere extrahierten Token mittels Signaturpruefung
    jwt.verify(token, process.env.SECRET, (err, payload) => {
        // Wenn Verifizierung fehlgeschlagen, brich ab und sende Fehler
        if (err) return res.status(401).send({success: false, message: 'Invalid token'});
        
        // Alles gut, speichere payload im req-Objekt
        // req.tokenPayload = payload;
        merge(req, { tokenPayload: payload })

        // Fahre mit Anfrage fort
        next();
    });
}

export const isOwner = async (req:express.Request, res:express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'tokenPayload._id') as string;
        console.log('user wth id:', id, ' is ',  currentUserId);

        if (!currentUserId) {
            return res.sendStatus(400);
        }
        if (currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }
        
        next();
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}