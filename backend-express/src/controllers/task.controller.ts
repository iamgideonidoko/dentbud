import type { Request, Response, NextFunction } from 'express';
import Task from '../models/task.model';
import { createSuccess } from '../helpers/http.helper';
import createError from 'http-errors';
import { removeTaskFromDb, saveTaskToDb, updateTaskInDb } from '../services/task.service';

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  // get tasks
  try {
    const tasks = await Task.find().sort({ created_at: -1 });
    return createSuccess(res, 200, 'Task fetched successfully', { tasks });
  } catch (err) {
    return next(err);
  }
};

export const getTasksByUserId = async (req: Request, res: Response, next: NextFunction) => {
  // get tasks that belongs to single user
  const { user_id } = req.params;
  if (!user_id) return next(new createError.BadRequest('User ID is required'));
  try {
    const tasks = await Task.find({ user_id }).sort({ created_at: -1 });
    return createSuccess(res, 200, 'Task fetched successfully', { tasks });
  } catch (err) {
    return next(err);
  }
};

export const getSingleTaskByUserId = async (req: Request, res: Response, next: NextFunction) => {
  // get tasks that belongs to single user
  const { id, user_id } = req.params;
  if (!user_id || !id) return next(new createError.BadRequest('User ID and Task ID are required'));
  try {
    const task = await Task.findOne({ id, user_id });
    if (!task) throw new createError.NotFound('Task not found');
    return createSuccess(res, 200, 'Task fetched successfully', { task });
  } catch (err) {
    return next(err);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  // create task
  const { user_id, title, description, starts, ends, done } = req.body;

  if (!user_id) return next(new createError.BadRequest('No user ID provided'));

  if (!title) {
    return next(createError(400, 'The title field is required.'));
  }
  try {
    const newTask = { user_id, title, description, starts, ends, done };
    const savedTask = await saveTaskToDb(newTask);
    return createSuccess(res, 200, 'Task created successfully', { task: savedTask });
  } catch (err) {
    return next(err);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  // update task
  const { id } = req.params;
  if (!id) return next(createError(400, 'No task ID provided'));
  const newUpdate = req.body;
  try {
    const updatedTask = await updateTaskInDb(id, newUpdate);
    return createSuccess(res, 200, 'Task updated successfully', { task: updatedTask });
  } catch (err) {
    return next(err);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  // delete task
  const { id } = req.params;
  if (!id) return next(createError(400, 'No task ID provided'));
  try {
    await removeTaskFromDb(id);
    return createSuccess(res, 200, 'Task deleted successfully', { deleted: true });
  } catch (err) {
    return next(err);
  }
};
