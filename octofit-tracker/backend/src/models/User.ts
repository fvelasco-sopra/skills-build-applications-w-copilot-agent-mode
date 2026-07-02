import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    teamName: { type: String, required: true },
    role: { type: String, required: true },
  },
  { versionKey: false }
);

export const UserModel = model('User', userSchema, 'users');