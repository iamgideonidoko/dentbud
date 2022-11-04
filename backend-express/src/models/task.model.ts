import { Schema, model } from 'mongoose';
import type { ITask } from '../interfaces/task.interface';

// Define Task schema
const taskSchema: Schema = new Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  starts: {
    type: Date,
  },
  ends: {
    type: Date,
  },
  done: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create Task model
const Task = model<ITask>('Task', taskSchema);

export default Task;
