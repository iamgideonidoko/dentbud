import { Schema, model } from 'mongoose';
import type { ICourse } from '../interfaces/course.interface';
// Define Course schema
const courseSchema: Schema = new Schema<ICourse>({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  course_name: {
    type: String,
    required: true,
  },
  course_code: {
    type: String,
    required: true,
    index: true,
  },
  exam_starts: {
    type: Date,
  },
  exam_ends: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

// Create Course model
const Course = model<ICourse>('Course', courseSchema);

export default Course;
