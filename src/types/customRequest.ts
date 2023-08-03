import { Request } from 'express';
import { User } from '../components/user/User.entity';

export interface CustomRequest extends Request {
  user?: User;
}