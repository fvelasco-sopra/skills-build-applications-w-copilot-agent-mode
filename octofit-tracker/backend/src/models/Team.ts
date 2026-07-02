import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    motto: { type: String, required: true },
    memberCount: { type: Number, required: true },
    captainEmail: { type: String, required: true },
  },
  { versionKey: false }
);

export const TeamModel = model('Team', teamSchema, 'teams');