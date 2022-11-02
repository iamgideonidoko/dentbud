import { Schema, model } from 'mongoose';

interface Task {
  title: string;
  description: string;
  starts: Date;
  ends: Date;
  done: boolean;
  created_at: Date;
}

// Define Task schema
const taskSchema: Schema = new Schema<Task>({
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
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Create Task model
const Task = model<Task>('Task', taskSchema);

export default Task;
