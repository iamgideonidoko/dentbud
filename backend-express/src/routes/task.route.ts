import { Router } from 'express';
import {
  getTasks,
  getTasksByUserId,
  createTask,
  updateTask,
  deleteTask,
  getSingleTaskByUserId,
} from '../controllers/task.controller';
import validateDto from '../middlewares/validateDto.middleware';
import { newTaskAjvValidate, updateTaskAjvValidate } from '../schemas/task.schema';

const taskRoute = Router();

/*
@route 			GET /api/tasks (get tasks)
@description 	get tasks
@access 		Public
*/
taskRoute.get('/tasks', getTasks);

/*
@route 			GET /api/tasks/user/:id (get tasks by a user)
@description 	get tasks
@access 		Public
*/
taskRoute.get('/tasks/user/:user_id', getTasksByUserId);

/*
@route 			GET /api/task/:id/user/:user_id (get tasks by a user)
@description 	get single task by a user
@access 		Public
*/
taskRoute.get('/task/:id/user/:user_id', getSingleTaskByUserId);

/*
@route 			POST /api/task/create (create task)
@description 	add new task
@access 		Public
*/
taskRoute.post('/task', validateDto(newTaskAjvValidate), createTask);

/*
@route 			POST /api/task/refresh (refresh token)
@description 	refresh user token
@access 		Public
*/
taskRoute.put('/task/:id', validateDto(updateTaskAjvValidate), updateTask);

/*
@route 			DELETE /api/task/refresh (refresh token)
@description 	refresh user token
@access 		Public
*/
taskRoute.delete('/task/:id', deleteTask);

export default taskRoute;
