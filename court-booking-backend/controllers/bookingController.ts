import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Court from '../models/Court';

export const createBooking = async (req: any, res: Response) => {
  const { courtId, date, timeSlot } = req.body;

  // Check if already booked
  const existing = await Booking.findOne({ court: courtId, date, timeSlot });
  if (existing) return res.status(400).json({ message: 'Court already booked' });

  const booking = await Booking.create({
    user: req.user.id,
    court: courtId,
    date,
    timeSlot,
  });

  res.status(201).json(booking);
};

export const getUserBookings = async (req: any, res: Response) => {
  const bookings = await Booking.find({ user: req.user.id }).populate('court');
  res.json(bookings);
};

export const cancelBooking = async (req: any, res: Response) => {
  const booking = await Booking.findById(req.params.bookingId);

  if (!booking || booking.user.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized or not found' });
  }

  await booking.remove();
  res.json({ message: 'Booking canceled' });
};
