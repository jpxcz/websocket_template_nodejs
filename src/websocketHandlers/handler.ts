import {fastify} from 'fastify';
import { authenticationHandler } from './authentication_handler';

type WebsocketHandler = {
  [s: string]: Function;
};

export const websocketHandler: WebsocketHandler = {
  auth: authenticationHandler,
};
