import { Controller, Get } from "@overnightjs/core";
import { CustomRequest } from "../../types/customRequest";
import { NextFunction, Response } from "express";
import { FindMatchRepository } from "./FindMatch.repository";
import cron from 'node-cron';
import { User } from "../user/User.entity";


@Controller("api/matchmaking")
export class MatchmakingAPI {
    private waiting: User[] = [];
    @Get("matching")
    public async matching(req: CustomRequest, res: Response, next: NextFunction) {
        // let cronStatus = true;
        this.waiting.push(req.user);
        res.status(200).json({ message: "Finding the other player..." });
        if (this.waiting.length >= 2) {
            try {
                await FindMatchRepository.matching(this.waiting.shift(), this.waiting.shift());
            } catch (error) {
                console.log(error);
            }
        }
        else {
            const cronJob = cron.schedule('* * * * * *', async () => {
                try {
                    if (await FindMatchRepository.matching(this.waiting.shift(), this.waiting.shift())) {
                        cronJob.stop();
                    }
                } catch (error) {
                    console.log(error);
                }
            });
            cronJob.start();
        }
    }
}