import 'dotenv/config';
import { app } from './App';
// import { io } from './services/socket/Socket';

try {
  app.start()
  // console.log('Socket service applied with default timeout: ', io._connectTimeout);
} catch (error) {
  console.log(error);
}
