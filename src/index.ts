import Fastify from 'fastify';
import FastifyWsPlugin from '@fastify/websocket';
import { generateDocumentationSchemas } from './documentation';
import { authenticationSchema } from './schemas/authentication';

const fastify = Fastify({
  logger: true,
});

fastify.register(FastifyWsPlugin);

fastify.register(async function (fastify) {
  fastify.get('/ws', { websocket: true }, (connection, req) => {
    connection.socket.on('message', (message) => {
      const msg = JSON.parse(message.toString());
      if (!msg.msgType) {
        console.warn('no msgType property. Wont be able to sanitize the message');
        return;
      }

      try {
        switch (msg.msgType) {
          case 'auth':
            const authSanitized = authenticationSchema.parse(msg);
            console.log(authSanitized);
            break;
          default:
            break;
        }
      } catch (err) {
        console.error(err);
      }
    });
  });
});

fastify.get('/', async (request, reply) => {
  return 'main page';
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
