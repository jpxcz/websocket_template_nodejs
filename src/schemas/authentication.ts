import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export const authenticationSchema = z
  .object({
    msgType: z.string({ description: 'message type' }).default('auth'),
    token: z.string({
      description: 'authentication token',
    }),
  })
  .describe('authenticate the websocket with the provided token');

export const authenticationJsonSchema = zodToJsonSchema(
  authenticationSchema,
  'authenticationSchema'
);
