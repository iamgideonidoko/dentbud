import type { Document } from 'mongoose';

export interface NewTask {
  title: string;
  description: string;
  starts: Date | string;
  ends: Date | string;
  done: boolean;
}

export interface ITask extends Document {
  title: string;
  description: string;
  starts: Date;
  ends: Date;
  done: boolean;
  created_at: Date;
}

export type UpdateTask = Partial<NewTask>;
