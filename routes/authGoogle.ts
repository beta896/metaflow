import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code as string;

  try {
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    const { id_token } = tokenRes.data;
    const userInfo = jwt.decode(id_token);

    const metaflowToken = jwt.sign(
      { email: userInfo.email, name: userInfo.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.redirect(\\/auth/success?token=\\);
  } catch (err) {
    console.error('[GOOGLE LOGIN ERROR]', err.message);
    res.status(500).send('Login failed');
  }
});

export default router;
import { handleGoogleAuth } from '../controllers/authController';

const userInfo = jwt.decode(id_token);
const metaflowToken = await handleGoogleAuth(userInfo);
