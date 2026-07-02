"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const Activity_1 = require("./models/Activity");
const Leaderboard_1 = require("./models/Leaderboard");
const Team_1 = require("./models/Team");
const User_1 = require("./models/User");
const Workout_1 = require("./models/Workout");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
const asyncHandler = (handler) => (req, res, next) => {
    void handler(req, res, next).catch(next);
};
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});
app.get('/api/users/', asyncHandler(async (_req, res) => {
    const users = await User_1.UserModel.find().select('-_id').lean();
    res.json({ apiBaseUrl, users });
}));
app.get('/api/teams/', asyncHandler(async (_req, res) => {
    const teams = await Team_1.TeamModel.find().select('-_id').lean();
    res.json({ apiBaseUrl, teams });
}));
app.get('/api/activities/', asyncHandler(async (_req, res) => {
    const activities = await Activity_1.ActivityModel.find().sort({ activityDate: -1 }).select('-_id').lean();
    res.json({ apiBaseUrl, activities });
}));
app.get('/api/leaderboard/', asyncHandler(async (_req, res) => {
    const leaderboard = await Leaderboard_1.LeaderboardModel.find().sort({ rank: 1 }).select('-_id').lean();
    res.json({ apiBaseUrl, leaderboard });
}));
app.get('/api/workouts/', asyncHandler(async (_req, res) => {
    const workouts = await Workout_1.WorkoutModel.find().select('-_id').lean();
    res.json({ apiBaseUrl, workouts });
}));
app.use((error, _req, res, _next) => {
    console.error(error);
    res.status(500).json({ message: 'Unexpected server error' });
});
(0, db_1.connectToDatabase)()
    .then(() => {
    app.listen(port, '0.0.0.0', () => {
        console.log(`OctoFit backend listening at ${apiBaseUrl}`);
    });
})
    .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
});
