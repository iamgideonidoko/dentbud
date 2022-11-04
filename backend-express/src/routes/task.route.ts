import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller';
import validateDto from '../middlewares/validateDto.middleware';
import { newTaskAjvValidate, updateTaskAjvValidate } from '../schemas/task.schema';

const taskRoute = Router();

/*
@route 			GET /api/task/login (get tasks)
@description 	get tasks
@access 		Public
*/
taskRoute.get('/tasks', getTasks);

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
