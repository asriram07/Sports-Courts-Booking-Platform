import express from 'express';
import { createStripeSession, handleWebhook } from '../controllers/paymentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create-session', protect, createStripeSession);
router.post('/webhook', handleWebhook); // no auth here

export default router;
