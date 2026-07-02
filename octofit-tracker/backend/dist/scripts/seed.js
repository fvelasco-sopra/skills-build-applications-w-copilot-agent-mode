"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const Workout_1 = require("../models/Workout");
dotenv_1.default.config();
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectToDatabase)();
    await Promise.all([
        User_1.UserModel.deleteMany({}),
        Team_1.TeamModel.deleteMany({}),
        Activity_1.ActivityModel.deleteMany({}),
        Leaderboard_1.LeaderboardModel.deleteMany({}),
        Workout_1.WorkoutModel.deleteMany({}),
    ]);
    await User_1.UserModel.insertMany([
        { name: 'Mona Lee', email: 'mona.lee@example.com', age: 31, teamName: 'Octo Runners', role: 'Team Captain' },
        { name: 'Dev Patel', email: 'dev.patel@example.com', age: 28, teamName: 'Core Crushers', role: 'Member' },
        { name: 'Avery Brooks', email: 'avery.brooks@example.com', age: 35, teamName: 'Flex Force', role: 'Coach' },
    ]);
    await Team_1.TeamModel.insertMany([
        { name: 'Octo Runners', motto: 'Every mile counts', memberCount: 8, captainEmail: 'mona.lee@example.com' },
        { name: 'Core Crushers', motto: 'Strong reps, stronger team', memberCount: 6, captainEmail: 'dev.patel@example.com' },
        { name: 'Flex Force', motto: 'Mobility makes momentum', memberCount: 5, captainEmail: 'avery.brooks@example.com' },
    ]);
    await Activity_1.ActivityModel.insertMany([
        { userEmail: 'mona.lee@example.com', activityType: 'Run', durationMinutes: 42, caloriesBurned: 430, activityDate: new Date('2026-06-28T07:15:00.000Z') },
        { userEmail: 'dev.patel@example.com', activityType: 'Strength Training', durationMinutes: 50, caloriesBurned: 380, activityDate: new Date('2026-06-29T18:30:00.000Z') },
        { userEmail: 'avery.brooks@example.com', activityType: 'Yoga', durationMinutes: 35, caloriesBurned: 180, activityDate: new Date('2026-06-30T06:45:00.000Z') },
    ]);
    await Leaderboard_1.LeaderboardModel.insertMany([
        { userEmail: 'mona.lee@example.com', displayName: 'Mona Lee', rank: 1, points: 1280, workoutsCompleted: 24 },
        { userEmail: 'dev.patel@example.com', displayName: 'Dev Patel', rank: 2, points: 1165, workoutsCompleted: 21 },
        { userEmail: 'avery.brooks@example.com', displayName: 'Avery Brooks', rank: 3, points: 1040, workoutsCompleted: 19 },
    ]);
    await Workout_1.WorkoutModel.insertMany([
        { title: 'Starter Strength', focus: 'Strength', difficulty: 'Beginner', durationMinutes: 30, exercises: ['Goblet squat', 'Push-up', 'Dumbbell row'] },
        { title: 'Endurance Builder', focus: 'Cardio', difficulty: 'Intermediate', durationMinutes: 40, exercises: ['Tempo run', 'Hill repeats', 'Cooldown jog'] },
        { title: 'Mobility Reset', focus: 'Recovery', difficulty: 'Beginner', durationMinutes: 25, exercises: ['Hip opener', 'Thoracic rotation', 'Hamstring stretch'] },
    ]);
    console.log(`Seeded MongoDB at ${database_1.mongoUri}`);
}
seed()
    .catch((error) => {
    console.error('Failed to seed octofit_db', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose_1.default.disconnect();
});
