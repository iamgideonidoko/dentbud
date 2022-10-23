import { Schema, model } from 'mongoose';

interface Token {
  user_id: string;
  token: string;
  created_at: Date;
}

// Define Token schema
const tokenSchema: Schema = new Schema<Token>({
  user_id: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create Token model
const Token = model<Token>('Token', tokenSchema);

export default Token;
