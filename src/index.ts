import Fastify from 'fastify';
import FastifyWsPlugin from '@fastify/websocket';
import {
  generateDocumentationSchemas,
} from './documentation';

const fastify = Fastify({
  logger: true,
});

fastify.register(FastifyWsPlugin);

fastify.register(async function (fastify) {
  fastify.get('/ws', { websocket: true }, (connection, req) => {
    connection.socket.on('message', (message) => {
      console.log(message.toString());
    });
  });
});

fastify.get('/', async (request, reply) => {
  return 'main page';
});

const start = async () => {
  try {
    generateDocumentationSchemas();
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
