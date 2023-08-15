import { ClassMiddleware, Controller, Get } from "@overnightjs/core";
import UserMiddleware from "../../user/User.middleware";
import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../../types/customRequest";
import { DailyRankRepository } from "./DailyRank.repository";
import { DayRepository } from "../../time/day/Day.repository";
import { Between } from "typeorm";

@Controller("api/dailyRank")
@ClassMiddleware([UserMiddleware.checkAuth])
export class DailyRankAPI {
    @Get("today")
    public async getTodayDailyRank(req: CustomRequest, res: Response, next: NextFunction) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const preDay = await DayRepository.findOne({ where: { time: Between(yesterday, today) } })
        res.json(await DailyRankRepository.find({ where: { day: preDay } }))
    }
}