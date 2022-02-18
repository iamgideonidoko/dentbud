import { Schema, model } from 'mongoose';

interface User {
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

// Define User schema
const userSchema: Schema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create User model
const User = model<User>('User', userSchema);

export default User;
