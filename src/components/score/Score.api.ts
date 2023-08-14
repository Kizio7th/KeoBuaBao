import { ClassMiddleware, Controller, Get } from "@overnightjs/core";
import { CustomRequest } from "../../types/customRequest";
import { NextFunction, Response } from "express"
import { ScoreRepository } from "./Score.repository";
import UserMiddleware from "../user/User.middleware";
import { UserRepository } from "../user/User.repository";

@Controller("api/score")
@ClassMiddleware([UserMiddleware.checkAuth])
export class ScoreAPI {
    @Get("tradeScore")
    public async tradePoint(req:CustomRequest, res: Response, next: NextFunction){
        res.send(ScoreRepository.tradeScore(await UserRepository.findOne({where:{id:req.user.id}})))
    }
}