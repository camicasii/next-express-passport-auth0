import { Schema, model } from "mongoose";

const User = new Schema({
  username: String,
  password: String,
  facebookId: Number,
  facebookId2: String
});

export default model("User", User);
