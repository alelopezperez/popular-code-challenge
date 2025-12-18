import mongoose from "mongoose";
import { Error as MongooseError } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  cellphone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, required: true, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model("User", UserSchema);

export function getUsers() {
  return UserModel.find();
}

export function getUserByEmail(email: string) {
  return UserModel.findOne({ email: email });
}

export function getUserBySessionToken(sessionToken: string) {
  return UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
}

export function getUserById(id: string) {
  return UserModel.findById(id);
}

export async function createUser(values: Record<string, any>) {
  const createNewUser = new UserModel(values);

  try {
    const savedUser = await createNewUser.save();
    const userObj = savedUser;
    return userObj;
  } catch (err) {
    throw err;
  }
}

export async function deleteUserById(id: string) {
  const deleted = await UserModel.findOneAndDelete({ _id: id });
  return deleted;
}

export async function updateUserById(id: string, values: Record<string, any>) {
  const updatedUser = await UserModel.findByIdAndUpdate(id, values, {
    new: true,
  });
  return updatedUser;
}
