import express from 'express';
import { register, login, refreshToken, getUserRoleAndEmail, ReturnAllUsers, updateUserRole, deleteUser, ForgotPassword, VerifyOTP, ResetPassword } from '../controllers/authController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = express.Router();

//User & Auth
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get('/user-role', getUserRoleAndEmail);
router.get('/return-users', ReturnAllUsers);
router.put('/update-role', updateUserRole);
router.delete('/delete-user', deleteUser);
router.post('/forgot-password', ForgotPassword);
router.post('/verify-otp', VerifyOTP);
router.post('/reset-password', ResetPassword);



// Protected route example
router.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

export default router;
