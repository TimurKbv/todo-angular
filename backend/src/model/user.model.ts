import mongoose from "mongoose";

 
// User Schema
const UserSchema = new mongoose.Schema({
username: { type: String, required: true },
email: { type: String, required: true },
password: { type: String, required: true},
}, { timestamps: true }); 

//  Model
export const UserModel = mongoose.model('User', UserSchema);
// Erstellt automatisch users Collection in der MongoDB, wenn noch nicht vorhanden


// ALL USERS
export const getUsers = () => UserModel.find();
// By EMAIL
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
// By session
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken
});
// By Username
export  const findUserByUsername = async (username: string) => UserModel.findOne({username});
// By ID
export const getUserById = (id: string) => UserModel.findById(id);
// Create User
export const createUser = async (userBody: Record<string, any>) => new UserModel(userBody)
.save().then(user => user.toObject());
// Delete User
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
// Edit User
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);