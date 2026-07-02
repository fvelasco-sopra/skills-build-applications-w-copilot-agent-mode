import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './db';
import { ActivityModel } from './models/Activity';
import { LeaderboardModel } from './models/Leaderboard';
import { TeamModel } from './models/Team';
import { UserModel } from './models/User';
import { WorkoutModel } from './models/Workout';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const asyncHandler = (handler: AsyncRouteHandler) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  void handler(req, res, next).catch(next);
};

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});

app.get('/api/users/', asyncHandler(async (_req, res) => {
  const users = await UserModel.find().select('-_id').lean();
  res.json({ apiBaseUrl, users });
}));

app.get('/api/teams/', asyncHandler(async (_req, res) => {
  const teams = await TeamModel.find().select('-_id').lean();
  res.json({ apiBaseUrl, teams });
}));

app.get('/api/activities/', asyncHandler(async (_req, res) => {
  const activities = await ActivityModel.find().sort({ activityDate: -1 }).select('-_id').lean();
  res.json({ apiBaseUrl, activities });
}));

app.get('/api/leaderboard/', asyncHandler(async (_req, res) => {
  const leaderboard = await LeaderboardModel.find().sort({ rank: 1 }).select('-_id').lean();
  res.json({ apiBaseUrl, leaderboard });
}));

app.get('/api/workouts/', asyncHandler(async (_req, res) => {
  const workouts = await WorkoutModel.find().select('-_id').lean();
  res.json({ apiBaseUrl, workouts });
}));

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ message: 'Unexpected server error' });
});

connectToDatabase()
  .then(() => {
    app.listen(port, '0.0.0.0', () => {
      console.log(`OctoFit backend listening at ${apiBaseUrl}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  });
