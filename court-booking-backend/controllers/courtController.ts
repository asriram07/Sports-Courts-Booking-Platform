import { Request, Response } from 'express';
import Court from '../models/Court';
import Booking from '../models/Booking';

export const getCourts = async (_req: Request, res: Response) => {
  const courts = await Court.find();
  res.json(courts);
};

export const getCourtById = async (req: Request, res: Response) => {
  const court = await Court.findById(req.params.courtId);
  if (!court) return res.status(404).json({ message: 'Court not found' });
  res.json(court);
};

export const searchCourts = async (req: Request, res: Response) => {
  const { location, date } = req.query;
  const query: any = {};
  if (location) query.location = location;
  const courts = await Court.find(query);
  res.json(courts);
};

export const checkAvailability = async (req: Request, res: Response) => {
  const { date } = req.query;
  const courtId = req.params.courtId;

  const bookings = await Booking.find({ court: courtId, date });
  const bookedSlots = bookings.map((b) => b.timeSlot);
  res.json({ bookedSlots });
};
