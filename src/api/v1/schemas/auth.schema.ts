import ajvInstance from './ajvInstance';
import { JSONSchemaType } from 'ajv';
import { LoginUser } from '../interfaces/auth.interface';

const loginUserSchema: JSONSchemaType<LoginUser> = {
  type: 'object',
  properties: {
    email: { type: 'string', nullable: false, format: 'email' },
    password: { type: 'string', nullable: false, minLength: 4 },
  },
  required: ['email', 'password'],
  additionalProperties: false,
};

// export a validate function
export const loginUserAjvValidate = ajvInstance.compile(loginUserSchema);
