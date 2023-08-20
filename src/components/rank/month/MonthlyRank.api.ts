import { ClassMiddleware, Controller, Get } from "@overnightjs/core";
import UserMiddleware from "../../user/User.middleware";
import { NextFunction, Request, Response } from "express";
import { MonthRepository } from "../../time/month/Month.repositort";
import { Between } from "typeorm";
import { MonthlyRankRepository } from "./MonthlyRank.repository";

@Controller("api/rank")
@ClassMiddleware([UserMiddleware.checkAuth])
export class MonthlyRankAPI {
    @Get("monthlyRank")
    public async getTodayMonthlyRank(req: Request, res: Response, next: NextFunction) {
        const thisMonth = new Date();
        let daysInMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 0).getDate();
        const lastMonth = new Date(thisMonth);
        lastMonth.setDate(lastMonth.getDate() - daysInMonth);
        try {
            const preMonth = await MonthRepository.findOne({ where: { time: Between(lastMonth, thisMonth) } })
            const monthlyRanks = await MonthlyRankRepository.find({ where: { month: preMonth } })
            const ranks = []
            for (const i of monthlyRanks) {
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
            
        }

    }
}