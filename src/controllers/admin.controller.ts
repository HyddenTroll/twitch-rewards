import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Admin from '../models/admin.model';
import User from '../models/user.model';

// ✅ Connexion admin
export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: 'Admin non trouvé' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: 'Mot de passe invalide' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
};

// ✅ Voir tous les streamers (admin)
export const getAllStreamers = async (_req: Request, res: Response) => {
  try {
    const streamers = await User.find({ role: 'streamer' }, 'username email isActive');
    res.json(streamers);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🟥 Supprimer un streamer
export const deleteStreamer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'Streamer supprimé' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur suppression' });
  }
};

// 🟡 Activer / désactiver un streamer
export const toggleStreamerStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: `Statut mis à jour : ${user.isActive ? 'activé' : 'désactivé'}`,
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur mise à jour du statut' });
  }
};
