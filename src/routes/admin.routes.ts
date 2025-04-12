import { Router } from 'express';
import {
  loginAdmin,
  getAllStreamers,
  deleteStreamer,
  toggleStreamerStatus,
} from '../controllers/admin.controller';

// ⛔ on supprime le middleware d'authentification

const router = Router();

// ✅ Route publique pour l'admin login (si tu la veux encore)
router.post('/login', loginAdmin);

// ✅ Routes SANS PROTECTION
router.get('/streamers', getAllStreamers);
router.delete('/streamers/:id', deleteStreamer);
router.patch('/streamers/:id/toggle', toggleStreamerStatus);

export default router;
