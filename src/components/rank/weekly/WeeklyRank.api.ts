import { ClassMiddleware, Controller, Get } from "@overnightjs/core";
import UserMiddleware from "../../user/User.middleware";
import { NextFunction, Request, Response } from "express";
import { Between } from "typeorm";
import { WeekRepository } from "../../time/week/Week.repository";
import { WeeklyRankRepository } from "./WeeklyRank.repository";

@Controller("api/rank")
@ClassMiddleware([UserMiddleware.checkAuth])
export class WeeklyRankAPI {
    @Get("weeklyRank")
    public async getTodayWeeklyRank(req: Request, res: Response, next: NextFunction) {
        const thisWeek = new Date();
        const lastWeek = new Date(thisWeek);
        lastWeek.setDate(lastWeek.getDate() - 7);
        try {
            const preWeek = await WeekRepository.findOne({ where: { time: Between(lastWeek, thisWeek) } })
            const weeklyRanks = await WeeklyRankRepository.find({ where: { week: preWeek } })
            const ranks = []
            for (const i of weeklyRanks) {
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