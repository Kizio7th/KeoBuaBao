import { ClassMiddleware, Controller, Get } from "@overnightjs/core";
import UserMiddleware from "../../user/User.middleware";
import { NextFunction, Request, Response } from "express";
import { MonthRepository } from "../../time/month/Month.repositort";
import { Between } from "typeorm";
import { MonthlyRankRepository } from "./MonthlyRank.repository";

@Controller("api/monthlyRank")
@ClassMiddleware([UserMiddleware.checkAuth])
export class MonthlyRankAPI {
    @Get("today")
    public async getTodayMonthlyRank(req: Request, res: Response, next: NextFunction) {
        const thisMonth = new Date();
        let daysInMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 0).getDate();
        const lastMonth = new Date(thisMonth);
        lastMonth.setDate(lastMonth.getDate() - daysInMonth);

        const preMonth = await MonthRepository.findOne({ where: { time: Between(lastMonth, thisMonth) } })
        res.json(await MonthlyRankRepository.find({ where: { month: preMonth } }))
    }
}