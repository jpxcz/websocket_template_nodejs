import { authenticationSchema } from '../schemas/authentication';
import {
  AuthenticationAck,
} from '../schemas/authentication_ack';

export const authenticationHandler = (ws: WebSocket, payload: any) => {
  try {
    const message = authenticationSchema.parse(payload);
    const response: AuthenticationAck = { msgType: 'auth_ack', status: true };
    ws.send(JSON.stringify(response));
    console.log('authentication message:', message);
  } catch (err) {
    console.error(err);
  }
};
