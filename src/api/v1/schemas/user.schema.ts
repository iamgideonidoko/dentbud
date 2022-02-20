import ajvInstance from './ajvInstance';
import { JSONSchemaType } from 'ajv';
import { NewUser } from '../interfaces/user.interface';

const newUserSchema: JSONSchemaType<NewUser> = {
  type: 'object',
  properties: {
    name: { type: 'string', nullable: false },
    email: { type: 'string', nullable: false },
    password: { type: 'string', nullable: false },
    retype_password: { type: 'string', nullable: false },
  },
  required: ['name', 'email', 'password', 'retype_password'],
  additionalProperties: false,
};

// export a validate function
export const newUserAjvValidate = ajvInstance.compile(newUserSchema);
