import express from 'express';
import { register, login } from '../controllers/authController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);


// Protected route example
router.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

export default router;
