// routes/auth.js
import express from 'express';
import { User } from '../models/User.js'; // ✅ Named import for ES Modules
import auth from '../controllers/authController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Auth Routes
router.post('/login', auth.login);
router.post('/login/google', auth.loginWithGoogle);
router.get('/me', verifyToken, auth.getMe);
router.post('/logout', auth.logout);

export default router;
module.exports = router;
