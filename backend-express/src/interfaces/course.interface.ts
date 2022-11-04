import type { Document } from 'mongoose';

export interface NewCourse {
  course_name: string;
  course_code: string;
  exam_starts?: Date | string;
  exam_ends?: Date | string;
}

export interface ICourse extends Document {
  course_name: string;
  course_code: string;
  exam_starts: Date;
  exam_ends: Date;
  created_at: Date;
}

export type UpdateCourse = Partial<NewCourse>;
