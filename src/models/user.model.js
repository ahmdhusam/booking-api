import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: String,
});

export const UserModel = model("User", UserSchema);
