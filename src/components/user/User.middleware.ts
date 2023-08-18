import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


export default class UserMiddleware {
  static async checkAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const verify = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      res.locals.user = verify.user;
      return next();
    } catch (error) {
      return next(error);
    }
  }
}


