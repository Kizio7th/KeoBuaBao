import { ClassMiddleware, Controller, Get } from "@overnightjs/core";
import UserMiddleware from "../../user/User.middleware";
import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../../types/customRequest";
import { Between } from "typeorm";
import { WeekRepository } from "../../time/week/Week.repository";
import { WeeklyRankRepository } from "./WeeklyRank.repository";

@Controller("api/weeklyRank")
@ClassMiddleware([UserMiddleware.checkAuth])
export class WeeklyRankAPI {
    @Get("today")
    public async getTodayWeeklyRank(req: CustomRequest, res: Response, next: NextFunction) {
        const thisWeek = new Date();
        const preWeek = new Date(thisWeek);
        preWeek.setDate(preWeek.getDate() - 7);
        const startTime = await WeekRepository.findOne({ where: { startTime: Between(preWeek, thisWeek) } })
        res.json(await WeeklyRankRepository.find({ where: { week: startTime } }))
    }
}