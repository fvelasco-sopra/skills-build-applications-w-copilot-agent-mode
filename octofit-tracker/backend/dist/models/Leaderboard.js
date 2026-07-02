"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardModel = void 0;
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    userEmail: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    workoutsCompleted: { type: Number, required: true },
}, { versionKey: false });
exports.LeaderboardModel = (0, mongoose_1.model)('Leaderboard', leaderboardSchema, 'leaderboard');
