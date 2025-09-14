import express from 'express';
const router = express.Router();

/**
 * @swagger
 * /offers:
 *   post:
 *     summary: Submit a new offer
 *     tags:
 *       - Offers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               offerId:
 *                 type: string
 *               affiliate:
 *                 type: string
 *               payout:
 *                 type: number
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Offer submitted successfully
 */
router.post('/offers', (req, res) => {
  res.status(200).json({ message: 'Offer submitted successfully' });
});

export default router;
