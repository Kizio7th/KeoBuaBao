import { ClassMiddleware, Controller, Get } from "@overnightjs/core";
import { NextFunction, Response, Request } from "express"
import { ScoreRepository } from "./Score.repository";
import UserMiddleware from "../user/User.middleware";
import { UserRepository } from "../user/User.repository";

@Controller("api/score")
@ClassMiddleware([UserMiddleware.checkAuth])
export class ScoreAPI {
    @Get("tradeScore")
    public async tradePoint(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({ message: await ScoreRepository.tradeScore(await UserRepository.findOne({ where: { id: res.locals.user.id } })) })
    }
}