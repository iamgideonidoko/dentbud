import ajvInstance from './ajvInstance';
import { JSONSchemaType } from 'ajv';

interface regUser {
  name: string;
  email: string;
  password: string;
}

const schema: JSONSchemaType<regUser> = {
  type: 'object',
  properties: {
    name: { type: 'string', nullable: false },
    email: { type: 'string', nullable: false },
    password: { type: 'string', nullable: false },
  },
  required: ['name', 'email', 'password'],
  additionalProperties: false,
};

// export a validate function
export default ajvInstance.compile(schema);
