import mongoose, { Schema, Document } from 'mongoose';

export interface UserIF extends Document {
  email: string;
  password: string;
  role: 'admin' | 'normaluser';
}

const userSchema = new Schema<UserIF>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'normaluser'],
      default: 'normaluser',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<UserIF>('user', userSchema);
