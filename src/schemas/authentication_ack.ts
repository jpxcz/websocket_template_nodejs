import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export const authenticationAckSchema = z
  .object({
    msgType: z.literal('auth_ack'),
    status: z.boolean().default(false),
  })
  .describe('response on the authentication');

export type AuthenticationAck = z.infer<typeof authenticationAckSchema>;
export const authenticationAckJsonSchema = zodToJsonSchema(
  authenticationAckSchema,
  'schema'
);
