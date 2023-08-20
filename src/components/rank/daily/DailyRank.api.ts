import { ClassMiddleware, Controller, Get } from "@overnightjs/core";
import UserMiddleware from "../../user/User.middleware";
import { NextFunction, Request, Response } from "express";
import { DailyRankRepository } from "./DailyRank.repository";
import { DayRepository } from "../../time/day/Day.repository";
import { Between } from "typeorm";

@Controller("api/rank")
// @ClassMiddleware([UserMiddleware.checkAuth])
export class DailyRankAPI {
    @Get("dailyRank")
    public async getTodayDailyRank(req: Request, res: Response, next: NextFunction) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        try {
            const preDay = await DayRepository.findOne({ where: { time: Between(yesterday, today) } })
            const dailyRanks = await DailyRankRepository.find({ where: { day: preDay } })
            const ranks = []
            for (const i of dailyRanks) {
                ranks.push({
                    id: i.id,
                    score: i.score,
                    rank: i.rank,
                    userId: i.user.id,
                    userName: i.user.name
                })
            }
            res.status(200).json(ranks)
        } catch (error) {
            console.error(error)
        }
    }
}