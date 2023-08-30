import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export const authenticationSchema = z
  .object({
    msgType: z.literal('auth'),
    username: z.string(),
    password: z.string(),
  })
  .describe('authenticate the websocket for the user session');

export const authenticationJsonSchema = zodToJsonSchema(
  authenticationSchema,
  'schema'
);
