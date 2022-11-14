import type { Document, Schema } from 'mongoose';

export interface NewCourse {
  user_id: string;
  course_name: string;
  course_code: string;
  exam_starts?: Date | string;
  exam_ends?: Date | string;
}

export interface ICourse extends Document {
  user_id: Schema.Types.ObjectId;
  course_name: string;
  course_code: string;
  exam_starts: Date;
  exam_ends: Date;
  created_at: Date;
}

export type UpdateCourse = Partial<NewCourse>;
