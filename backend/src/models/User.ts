import mongoose, { Schema, Document } from 'mongoose';

export interface UserIF extends Document {
  email: string;
  password: string;
  role: 'admin' | 'normal';
}

const userSchema = new Schema<UserIF>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,

    },
    role: {
      type: String,
      enum: ['admin', 'normal'],
      default: 'normal',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<UserIF>('user', userSchema);
