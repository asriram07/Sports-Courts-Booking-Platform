import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  court: mongoose.Types.ObjectId;
  date: string;
  timeSlot: string;
  status: 'booked' | 'cancelled';
}

const bookingSchema = new Schema<IBooking>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    court: { type: mongoose.Schema.Types.ObjectId, ref: 'Court', required: true },
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    timeSlot: { type: String, required: true }, // Format: HH:MM-HH:MM
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
  },
  { timestamps: true }
);

const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
export default Booking;
