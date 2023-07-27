import mongoose from "mongoose";

 
// User Schema
const UserSchema = new mongoose.Schema({
username: { type: String, required: true },
email: { type: String, required: true },
authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
},
lastLogin: {type: Date, default: Date.now()}
}, { timestamps: true }); 

//  Model
export const UserModel = mongoose.model('User', UserSchema);
// Erstellt automatisch users Collection in der MongoDB, wenn noch nicht vorhanden


// ALL USERS
export const getUsers = () => UserModel.find();
// By EMAIL
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
// 
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken
});