import express, { Request, Response } from 'express';
import axios from 'axios';
import qs from 'querystring';

const router = express.Router();

const CLIENT_ID = process.env.TWITCH_CLIENT_ID!;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET!;
const REDIRECT_URI = process.env.TWITCH_REDIRECT_URI!;

// Redirige vers Twitch pour auth
router.get('/login', (_req, res) => {
  const scope = 'user:read:email';
  const twitchAuthUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${scope}`;
  res.redirect(twitchAuthUrl);
});

// Callback Twitch
router.get('/callback', async (req: Request, res: Response) => {
  const code = req.query.code;

  if (!code || typeof code !== 'string') {
    return res.status(400).send('Code Twitch manquant ou invalide.');
  }

  try {
    const tokenRes = await axios.post(
      'https://id.twitch.tv/oauth2/token',
      qs.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    const userRes = await axios.get('https://api.twitch.tv/helix/users', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-Id': CLIENT_ID,
      },
    });

    const twitchUser = userRes.data.data[0];
    console.log('✅ Utilisateur connecté via Twitch :', twitchUser);

    // Redirige vers le frontend
    res.redirect(`http://localhost:5173/viewer/callback?name=${encodeURIComponent(twitchUser.display_name)}`);
  } catch (err: any) {
    console.error('❌ Erreur callback Twitch :', err.response?.data || err.message);
    res.status(500).send('Erreur pendant le callback Twitch.');
  }
});

export default router;
