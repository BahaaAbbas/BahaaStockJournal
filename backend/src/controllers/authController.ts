import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { JWT_SECRET } from '../server.js';

const TOKEN_EXPIRY = '1h';



// @desc    Register a new user
// @route   POST /api/auth/register
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
// @route   POST /api/auth/login
export const login = async (req: Request, res: Response): Promise<void>  => {
  const { email, password } = req.body;

 

  try {
    console.log(email , password)
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
      { id: user._id, role: user.role },
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
