import Course from '../models/course.model';
import type { ICourse, NewCourse } from '../interfaces/course.interface';
import createError from 'http-errors';

export const checkIfCourseExists = (course_code: string, user_id: string): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const course = await Course.findOne({ course_code, user_id });
      if (course) resolve(true);
      resolve(false);
    } catch (err) {
      reject(err);
    }
  });
};

export const saveCourseToDb = (course: NewCourse): Promise<ICourse & { _id: string }> => {
  return new Promise<ICourse & { _id: string }>(async (resolve, reject) => {
    try {
      const newCourse = new Course(course);
      const savedCourse = await newCourse.save();
      resolve(savedCourse);
    } catch (err) {
      reject(err);
    }
  });
};

export const removeCourseFromDb = (courseId: string): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const task = await Course.findByIdAndDelete(courseId);
      if (task) resolve(true);
      reject(new createError.NotFound('Course not found'));
    } catch (err) {
      reject(err);
    }
  });
};

export const updateCourseInDb = (id: string, newUpdate: object): Promise<ICourse & { _id: string }> => {
  return new Promise<ICourse & { _id: string }>(async (resolve, reject) => {
    try {
      const course = await Course.findByIdAndUpdate(id, newUpdate, { new: true });
      resolve(course as ICourse & { _id: string });
    } catch (err) {
      reject(err);
    }
  });
};
