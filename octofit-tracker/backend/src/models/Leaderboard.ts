import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userEmail: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    workoutsCompleted: { type: Number, required: true },
  },
  { versionKey: false }
);

export const LeaderboardModel = model('Leaderboard', leaderboardSchema, 'leaderboard');