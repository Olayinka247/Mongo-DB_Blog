import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    avatar: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      telephone: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
