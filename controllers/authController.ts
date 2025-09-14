import jwt from 'jsonwebtoken';
import { pool } from '../db';

export async function handleGoogleAuth(userInfo: any) {
  const { email, name } = userInfo;

  const existingUser = await pool.query('SELECT * FROM users WHERE email = ', [email]);

  if (existingUser.rows.length === 0) {
    await pool.query(
      'INSERT INTO users (email, name, created_at) VALUES (, , NOW())',
      [email, name]
    );
    console.log('[NEW USER CREATED]', email);
  }

  const token = jwt.sign({ email, name }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return token;
}
