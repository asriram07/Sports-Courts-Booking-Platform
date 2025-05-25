import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import generateToken from '../utils/generateToken';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ name, email, password: hashedPassword });

  const token = generateToken(user._id.toString());
  res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

  res.status(201).json({ _id: user._id, name: user.name, email: user.email });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = generateToken(user._id.toString());
  res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

  res.json({ _id: user._id, name: user.name, email: user.email });
};

export const logoutUser = (_req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

export const getMe = async (req: any, res: Response) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};
