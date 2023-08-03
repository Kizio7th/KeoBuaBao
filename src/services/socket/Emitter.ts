import { Emitter } from '@socket.io/redis-emitter';
import { redis } from '../redis/redis';

const SocketEmitter = new Emitter(redis)

export default SocketEmitter
