"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModel = void 0;
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    motto: { type: String, required: true },
    memberCount: { type: Number, required: true },
    captainEmail: { type: String, required: true },
}, { versionKey: false });
exports.TeamModel = (0, mongoose_1.model)('Team', teamSchema, 'teams');
