import Fastify from 'fastify';
import FastifyWsPlugin from '@fastify/websocket';
import FastifyStaticPlugin from '@fastify/static';
import path from 'node:path';
import { websocketHandler } from './websocketHandlers/handler';

const rootProjectPath = path.resolve(__dirname, '..');
const fastify = Fastify({
  logger: true,
});

fastify.register(FastifyStaticPlugin, {
  root: path.join(rootProjectPath, 'documentation/output'),
});
fastify.register(FastifyWsPlugin);
fastify.register(async function (fastify) {
  fastify.get('/ws', { websocket: true }, (connection, req) => {
    connection.socket.on('message', (message) => {
      const msg = JSON.parse(message.toString());
      if (!msg.msgType) {
        fastify.log.warn({ msg: 'no msgType property found' });
        return;
      }

      if (!websocketHandler[msg.msgType]) {
        fastify.log.error({
          msg: `no handler found for message type ${msg.msgType}`,
        });
        return;
      }

      websocketHandler[msg.msgType](connection, msg);
    });
  });
});

fastify.get('/', async (request, reply) => {
  return 'main api page';
});

fastify.get('/documentation', async function (req, reply) {
  return reply.sendFile('index.html');
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
