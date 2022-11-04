import Task from '../models/task.model';
import type { ITask, NewTask } from '../interfaces/task.interface';
import createError from 'http-errors';

export const saveTaskToDb = (task: NewTask): Promise<ITask & { _id: string }> => {
  return new Promise<ITask & { _id: string }>(async (resolve, reject) => {
    try {
      const newTask = new Task(task);
      const savedTask = await newTask.save();
      resolve(savedTask);
    } catch (err) {
      reject(err);
    }
  });
};

export const removeTaskFromDb = (taskId: string): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const task = await Task.findById(taskId);
      if (task) {
        await task.remove();
        resolve(true);
      } else {
        reject(new createError.NotFound('Task with id could not be found'));
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const updateTaskInDb = (id: string, newUpdate: object): Promise<ITask & { _id: string }> => {
  return new Promise<ITask & { _id: string }>(async (resolve, reject) => {
    try {
      const task = await Task.findByIdAndUpdate(id, newUpdate, { new: true });
      resolve(task as ITask & { _id: string });
    } catch (err) {
      reject(err);
    }
  });
};
