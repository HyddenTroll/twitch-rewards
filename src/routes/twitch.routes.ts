import express from 'express';
import axios from 'axios';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // 🔑 Charge bien le .env

const router = express.Router();

// ✅ Clés Twitch depuis .env
const CLIENT_ID = process.env.TWITCH_CLIENT_ID!;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET!;
let accessToken = ''; // 🔐 Token global

console.log("✅ TWITCH_CLIENT_ID:", CLIENT_ID); // debug

// 🔑 Récupération du token d'application avec client_credentials
const getAccessToken = async () => {
  if (!accessToken) {
    try {
      const res = await axios.post('https://id.twitch.tv/oauth2/token', null, {
        params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: 'client_credentials',
        },
      });

      accessToken = res.data.access_token;
      console.log("🔐 Nouveau token Twitch généré");
    } catch (error: any) {
      console.error("❌ Erreur de génération du token Twitch :", error.response?.data || error.message);
      throw error;
    }
  }

  return accessToken;
};

// 🔍 Route de recherche dynamique de chaînes
router.get('/search', async (req, res) => {
  const query = req.query.q as string;

  if (!query) {
    return res.status(400).json({ error: 'Missing search query' });
  }

  try {
    const token = await getAccessToken();

    const twitchRes = await axios.get('https://api.twitch.tv/helix/search/channels', {
      headers: {
        'Client-ID': CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      params: {
        query: query.toLowerCase(),
      },
    });

    return res.json(twitchRes.data.data); // ✅ Liste des chaînes retournées
  } catch (err: any) {
    console.error('❌ Twitch Search Error:', err.response?.data || err.message);
    return res.status(500).json({
      error: 'Erreur API Twitch',
      details: err.response?.data || err.message,
    });
  }
});

export default router;
