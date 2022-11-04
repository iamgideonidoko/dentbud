import ajvInstance from './ajvInstance';
import type { JSONSchemaType } from 'ajv';
import type { NewCourse, UpdateCourse } from '../interfaces/course.interface';

const newCourseSchema: JSONSchemaType<NewCourse> = {
  type: 'object',
  properties: {
    course_name: { type: 'string', nullable: false, minLength: 2 },
    course_code: { type: 'string', nullable: false, minLength: 2 },
    exam_starts: { type: 'string', nullable: true },
    exam_ends: { type: 'string', nullable: true },
  },
  required: ['course_name', 'course_code'],
  additionalProperties: false,
};

// export a validate function
export const newCourseAjvValidate = ajvInstance.compile(newCourseSchema);

const updateCourseSchema: JSONSchemaType<UpdateCourse> = {
  type: 'object',
  properties: {
    course_name: { type: 'string', nullable: true, minLength: 2 },
    course_code: { type: 'string', nullable: true, minLength: 2 },
    exam_starts: { type: 'string', nullable: true },
    exam_ends: { type: 'string', nullable: true },
  },
  required: [],
  additionalProperties: false,
};

// export a validate function
export const updateCourseAjvValidate = ajvInstance.compile(updateCourseSchema);
