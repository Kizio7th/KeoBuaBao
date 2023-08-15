import { ClassMiddleware, Controller, Get } from "@overnightjs/core";
import UserMiddleware from "../../user/User.middleware";
import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../../types/customRequest";
import { MonthRepository } from "../../time/month/Month.repositort";
import { Between } from "typeorm";
import { MonthlyRankRepository } from "./MonthlyRank.repository";

@Controller("api/monthlyRank")
@ClassMiddleware([UserMiddleware.checkAuth])
export class MonthlyRankAPI {
    @Get("today")
    public async getTodayMonthlyRank(req: CustomRequest, res: Response, next: NextFunction) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const nextMonth = currentMonth + 1;
        const lastDayOfMonth = new Date(currentDate.getFullYear(), nextMonth, 0).getDate();
        const thisMonth = new Date();
        const preMonth = new Date(thisMonth);
        preMonth.setDate(preMonth.getDate() - lastDayOfMonth);
        const startTime = await MonthRepository.findOne({ where: { startTime: Between(preMonth, thisMonth) } })
        res.json(await MonthlyRankRepository.find({ where: { month: startTime } }))
    }
}