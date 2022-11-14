import ajvInstance from './ajvInstance';
import type { JSONSchemaType } from 'ajv';
import type { NewCourse, UpdateCourse } from '../interfaces/course.interface';

const newCourseSchema: JSONSchemaType<NewCourse> = {
  type: 'object',
  properties: {
    user_id: { type: 'string', nullable: false },
    course_name: { type: 'string', nullable: false, minLength: 2 },
    course_code: { type: 'string', nullable: false, minLength: 2 },
    exam_starts: { type: 'string', nullable: true },
    exam_ends: { type: 'string', nullable: true },
  },
  required: ['course_name', 'course_code', 'user_id'],
  additionalProperties: false,
};

// export a validate function
export const newCourseAjvValidate = ajvInstance.compile(newCourseSchema);

const updateCourseSchema: JSONSchemaType<UpdateCourse & { user_id: string }> = {
  type: 'object',
  properties: {
    user_id: { type: 'string', nullable: false },
    course_name: { type: 'string', nullable: true, minLength: 2 },
    course_code: { type: 'string', nullable: true, minLength: 2 },
    exam_starts: { type: 'string', nullable: true },
    exam_ends: { type: 'string', nullable: true },
  },
  required: ['user_id'],
  additionalProperties: false,
};

// export a validate function
export const updateCourseAjvValidate = ajvInstance.compile(updateCourseSchema);
