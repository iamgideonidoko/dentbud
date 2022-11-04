import { Router } from 'express';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../controllers/course.controller';
import validateDto from '../middlewares/validateDto.middleware';
import { newCourseAjvValidate, updateCourseAjvValidate } from '../schemas/course.schema';

const courseRoute = Router();

/*
@route 			GET /api/courses (get courses)
@description 	get courses
@access 		Public
*/
courseRoute.get('/courses', getCourses);

/*
@route 			POST /api/course (create course)
@description 	add new course
@access 		Public
*/
courseRoute.post('/course', validateDto(newCourseAjvValidate), createCourse);

/*
@route 			PUT /api/course/:id
@description 	update course
@access 		Public
*/
courseRoute.put('/course/:id', validateDto(updateCourseAjvValidate), updateCourse);

/*
@route 			DELETE /api/course/:id (refresh token)
@description 	delete course
@access 		Public
*/
courseRoute.delete('/course/:id', deleteCourse);

export default courseRoute;
