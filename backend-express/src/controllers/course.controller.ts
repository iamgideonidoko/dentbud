import type { Request, Response, NextFunction } from 'express';
import Course from '../models/course.model';
import { createSuccess } from '../helpers/http.helper';
import createError from 'http-errors';
import { checkIfCourseExists, removeCourseFromDb, saveCourseToDb, updateCourseInDb } from '../services/course.service';

export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
  // get courses
  try {
    const courses = await Course.find().sort({ created_at: -1 });
    return createSuccess(res, 200, 'Course fetched successfully', { courses });
  } catch (err) {
    return next(err);
  }
};

export const createCourse = async (req: Request, res: Response, next: NextFunction) => {
  // create course
  const { course_name, course_code, exam_starts, exam_ends } = req.body;

  if (!course_name || !course_code) {
    return next(createError(400, "The 'course_name' and 'course_code' fields are required."));
  }
  try {
    const courseExists = await checkIfCourseExists(course_code);
    if (courseExists) {
      return next(
        createError(
          400,
          ...[
            {
              message: 'Course with the same course code already exists and course codes must be unique.',
              errorType: 'COURSE_ALREADY_EXISTS',
            },
          ],
        ),
      );
    }
    const newCourse = {
      course_name,
      course_code,
      exam_starts,
      exam_ends,
    };
    const savedCourse = await saveCourseToDb(newCourse);
    return createSuccess(res, 200, 'Course created successfully', { course: savedCourse });
  } catch (err) {
    return next(err);
  }
};

export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  // update course
  const { id } = req.params;
  const newCourseCode = req.query?.new_course_code?.toString();
  if (!id) return next(createError(400, 'No `id` provided'));
  const { course_code } = req.body;
  const newUpdate = req.body;
  try {
    if (course_code && newCourseCode === 'true') {
      const courseExists = await checkIfCourseExists(course_code);
      if (courseExists)
        return next(
          createError(
            400,
            ...[
              {
                message: 'A different course with the same course code already exists and course codes must be unique.',
                errorType: 'COURSE_ALREADY_EXISTS',
              },
            ],
          ),
        );
    }
    const updatedCourse = await updateCourseInDb(id, newUpdate);
    return createSuccess(res, 200, 'Course updated successfully', { course: updatedCourse });
  } catch (err) {
    return next(err);
  }
};

export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
  // delete course
  const { id } = req.params;
  if (!id) return next(createError(400, 'No `id` provided'));
  try {
    await removeCourseFromDb(id);
    return createSuccess(res, 200, 'Course deleted successfully', { deleted: true });
  } catch (err) {
    return next(err);
  }
};
