import { Controller, Post } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import { MatchRepository } from "./Match.repository";
import cron from 'node-cron';
import { CustomRequest } from "../../types/customRequest";

@Controller("api/match")
export class MatchAPI {
    private userChoices: Map<number, { choice: string, playerId: number }> = new Map();
    @Post(":id")
    public async match(req: CustomRequest, res: Response, next: NextFunction) {
        const matchId = parseInt(req.params.id)
        const { Choice } = req.body;
        if (this.userChoices.has(matchId)) {
            if (MatchRepository.result(Choice, this.userChoices.get(matchId).choice) == 1) {
                MatchRepository.updateResult(matchId, req.user.id)
                res.status(200).json({ message: "You win" });
            }
            else if (MatchRepository.result(Choice, this.userChoices.get(matchId).choice) == -1) {
                MatchRepository.updateResult(matchId, this.userChoices.get(matchId).playerId)
                res.status(200).json({ message: "You lose" });
            }
            else {
                MatchRepository.updateResult(matchId, 0)
                res.status(200).json({ message: "Draw" });
            }
        }
        else {
            this.userChoices.set(matchId, { choice: Choice, playerId: req.user.id })
            const cronJob = cron.schedule('* * * * * *', async () => {
                try {
                    const match = await MatchRepository.findOne({ where: { id: matchId } })
                    if (match.result) {
                        res.status(200).json({ message: MatchRepository.checkResult(match, req.user.id) });
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