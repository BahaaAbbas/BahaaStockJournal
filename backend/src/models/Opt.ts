import mongoose, { Schema, Document } from 'mongoose';

export interface OtpIF extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const otpSchema = new Schema<OtpIF>(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,

    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 60
    }

  },
  { timestamps: true }
);

export default mongoose.model<OtpIF>('otp', otpSchema);
