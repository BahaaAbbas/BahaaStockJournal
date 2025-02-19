import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import { EMAIL_PASS, EMAIL_USER, JWT_SECRET } from '../config/Config.js';
import OTP from '../models/Opt.js';

const TOKEN_EXPIRY = '1h';



// @desc    Register a new user
// @route   POST /auth/register
export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role } = req.body;

  try {

    const userExists = await User.findOne({ email });

    if (userExists) {

      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    return;
  }


};


// @desc    Login user
// @route   POST /auth/login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;



  try {

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      TOKEN_EXPIRY,
    });
    return;

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
    return;
  }
};



interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
  email: string;
}

// @desc    Refresh access token
// @route   POST /auth/refresh-token
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {

    const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;

    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role, email: decoded.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );


    const expiresIn = Math.floor(Date.now() / 1000) + 3600; // Set expiration time for 1 hour
    res.status(200).json({ newAccessToken, expiresIn });
  } catch (error) {
    res.status(401).json({ message: 'Token expired or invalid' });
  }
};

// @desc    Get user role
// @route   get /auth/user-role
export const getUserRoleAndEmail = (req: Request, res: Response): void => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string; email: string };
    res.status(200).json({ role: decoded.role, email: decoded.email });
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};



// @desc    Get Return All Users
// @route   get /auth/return-users
export const ReturnAllUsers = async (req: Request, res: Response): Promise<void> => {

  try {
    const users = await User.find({}, 'email role createdAt');

    if (!users || users.length === 0) {
      res.status(404).json({ message: 'No Users Found!' });
      return;
    }

    res.json(users);
    return;

  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });

  }
}




// @desc    Update User Role
// @route   put /auth/update-role

export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role, email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.role = role;
    await user.save();
    res.status(200).json({ message: 'User role updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};




// @desc    Delete User
// @route   delete /auth/delete-user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;


  if (!email) {
    res.status(400).json({ message: 'Email is required' });
    return;
  }

  try {
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ message: `User ${email} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
}

// @desc    Forgot Password
// @route   post /auth/forgot-password
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const ForgotPassword = async (req: Request, res: Response): Promise<void> => {

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  await OTP.create({ email, otp });

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: 'Password Reset OTP',
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: 'OTP sent to your email!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send OTP email' });
  }
};




// @desc    Verify OTP
// @route   post /auth/verify-otp
export const VerifyOTP = async (req: Request, res: Response): Promise<void> => {

  const { email, otp } = req.body;
  const recordOTP = await OTP.findOne({ email, otp });

  if (recordOTP) {
    await OTP.deleteOne({ email });
    res.json({ success: 'OTP verified!' });
    return;
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
    return;
  }
};



// @desc    Reset Password
// @route   post /auth/reset-password 
export const ResetPassword = async (req: Request, res: Response): Promise<void> => {
  const { email, newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.updateOne({ email }, { password: hashedPassword });
  res.json({ success: 'Password reset successful!' });
};

