
import mongoose, { Schema, Document } from 'mongoose';

export interface ITrade extends Document{
    _id: string;
    email: mongoose.SchemaDefinitionProperty<mongoose.SchemaDefinitionProperty<{
        type: String;
        required: true;
    }, ITrade> | undefined, ITrade> | undefined
    symbol: string;
    shares: number;
    pnl: number;
    commission: number;
    buyPrice: number;
    sellPrice: number;
    entryDate: Date;
    exitDate: Date;
    notes?: string;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
  }
  

const tradeSchema = new Schema<ITrade>({
  email: { type: String, required: true },
  symbol: { type: String, required: true },
  shares: { type: Number, required: true },
  pnl: { type: Number, required: true },
  commission: { type: Number, required: true },
  buyPrice: { type: Number, required: true },
  sellPrice: { type: Number, required: true },
  entryDate: { type: Date, required: true },
  exitDate: { type: Date, required: true },
  notes: { type: String },
  tags: { type: [String] },
},
{ timestamps: true }
);

tradeSchema.pre('validate', function (next) {
    if (this.buyPrice == null || this.sellPrice == null) {
      return next(new Error('Both buyPrice and sellPrice must be provided.'));
    }
    next();
  });
  
export const TradeModel = mongoose.model<ITrade>('trade', tradeSchema);


