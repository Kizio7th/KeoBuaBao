import { ClassMiddleware, Controller, Get } from "@overnightjs/core";
import UserMiddleware from "../../user/User.middleware";
import { NextFunction, Request, Response } from "express";
import { Between } from "typeorm";
import { WeekRepository } from "../../time/week/Week.repository";
import { WeeklyRankRepository } from "./WeeklyRank.repository";

@Controller("api/weeklyRank")
@ClassMiddleware([UserMiddleware.checkAuth])
export class WeeklyRankAPI {
    @Get("today")
    public async getTodayWeeklyRank(req: Request, res: Response, next: NextFunction) {
        const thisWeek = new Date();
        const lastWeek = new Date(thisWeek);
        lastWeek.setDate(lastWeek.getDate() - 7);

        const preWeek = await WeekRepository.findOne({ where: { time: Between(lastWeek, thisWeek) } })
        res.json(await WeeklyRankRepository.find({ where: { week: preWeek } }))
    }
}