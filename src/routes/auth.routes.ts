import express from 'express';
import { registerStreamer } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', registerStreamer);

export default router;
