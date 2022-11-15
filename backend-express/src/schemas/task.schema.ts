import ajvInstance from './ajvInstance';
import type { JSONSchemaType } from 'ajv';
import type { NewTask, UpdateTask } from '../interfaces/task.interface';

const newTaskSchema: JSONSchemaType<NewTask> = {
  type: 'object',
  properties: {
    user_id: { type: 'string', nullable: false },
    title: { type: 'string', nullable: false, minLength: 2 },
    description: { type: 'string', nullable: true },
    starts: { type: 'string', nullable: true },
    ends: { type: 'string', nullable: true },
    done: { type: 'boolean', nullable: true },
  },
  required: ['title', 'user_id'],
  additionalProperties: false,
};

// export a validate function
export const newTaskAjvValidate = ajvInstance.compile(newTaskSchema);

const updateTaskSchema: JSONSchemaType<UpdateTask> = {
  type: 'object',
  properties: {
    user_id: { type: 'string', nullable: true },
    title: { type: 'string', nullable: true, minLength: 2 },
    description: { type: 'string', nullable: true },
    starts: { type: 'string', nullable: true },
    ends: { type: 'string', nullable: true },
    done: { type: 'boolean', nullable: true },
  },
  required: [],
  additionalProperties: false,
};

// export a validate function
export const updateTaskAjvValidate = ajvInstance.compile(updateTaskSchema);
