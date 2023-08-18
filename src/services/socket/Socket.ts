import { createAdapter } from "@socket.io/redis-adapter";
import Redis from "ioredis";
import Jwt from "moevuive/Jwt";
import { Server } from "socket.io";
import { app } from '../../App';
// import SocketEmitter from "./Emitter";

const io = new Server(app.server, { cors: { origin: '*' } })
const pubClient = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD||null,
  db: 4
})

const subClient = pubClient.duplicate();
io.adapter(createAdapter(pubClient, subClient))

// io.use(async (socket, next) => {
//   if (!socket.handshake.query.token) {
//     return next(new Error('unauthorized event'))
//   }
//   try {
//     const decoded = Jwt.decode(socket.handshake.query.token, process.env.JWT_SECRET) as any
//     if (!decoded || !decoded.island) throw new Error('unauthorized')
//     socket['userData'] = decoded.island
//     return next()
//   } catch (error) {
//     console.log(error)

//     return next(new Error('unauthorized event'))
//   }
// })

io.on('connection', async (socket) => {
  console.log('An user connected',socket.id);
  
  await socket.join(socket.id)
  // SocketEmitter.emit('',)
  // const chatLog = await getChatLog()
  // for (const chat of chatLog) {
  //   socket.emit('speaker-message', chat)
  // }
})

export { io };

