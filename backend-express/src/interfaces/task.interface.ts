import type { Document, Schema } from 'mongoose';

export interface NewTask {
  user_id: string;
  title: string;
  description: string;
  starts: Date | string;
  ends: Date | string;
  done: boolean;
}

export interface ITask extends Document {
  user_id: Schema.Types.ObjectId;
  title: string;
  description: string;
  starts: Date;
  ends: Date;
  done: boolean;
  created_at: Date;
}

export type UpdateTask = Partial<NewTask>;
