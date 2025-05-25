import mongoose, { Document, Schema } from 'mongoose';

export interface ICourt extends Document {
  name: string;
  location: string;
  type: string;
  hourlyRate: number;
}

const courtSchema = new Schema<ICourt>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true }, // e.g., tennis, badminton
    hourlyRate: { type: Number, required: true },
  },
  { timestamps: true }
);

const Court = mongoose.model<ICourt>('Court', courtSchema);
export default Court;
