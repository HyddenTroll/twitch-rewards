import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import twitchRoutes from './routes/twitch.routes';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app: Application = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ✅ Import des routes
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import viewerRoutes from './routes/viewer.routes'; // ← assure-toi que c'est un router

// ✅ Montage des routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/viewer', viewerRoutes); // ← ici OK

// ✅ Route de test
app.get('/api/ping', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'pong' });
});

// ⚠️ Gestion erreurs
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 🔌 MongoDB + lancement
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

  app.use('/api/twitch', twitchRoutes);