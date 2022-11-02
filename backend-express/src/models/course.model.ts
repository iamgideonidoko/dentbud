import { Schema, model } from 'mongoose';

interface Course {
  course_name: string;
  course_code: string;
  exam_starts: Date;
  exam_ends: Date;
  created_at: Date;
}

// Define Course schema
const courseSchema: Schema = new Schema<Course>({
  course_name: {
    type: String,
    required: true,
  },
  course_code: {
    type: String,
    required: true,
  },
  exam_starts: {
    type: Date,
    required: true,
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
const Course = model<Course>('Course', courseSchema);

export default Course;
