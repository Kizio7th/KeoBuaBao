import { ClassMiddleware, Controller, Post } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import { MatchRepository } from "./Match.repository";
import { CustomRequest } from "../../types/customRequest";
import UserMiddleware from "../user/User.middleware";

@Controller("api/match")
@ClassMiddleware([UserMiddleware.checkAuth])
export class MatchAPI {
    private userChoices: Map<number, { choice: string, playerId: number }> = new Map();
    @Post(":id")
    public async match(req: CustomRequest, res: Response, next: NextFunction) {
        const matchId = parseInt(req.params.id)
        const { Choice } = req.body;
        if (this.userChoices.has(matchId)) {
            const p1 = this.userChoices.get(matchId);
            if (MatchRepository.result(Choice, p1.choice) == 1) {
                MatchRepository.updateResult(matchId, req.user.id);
                res.status(200).json({ message: "You win" });
            }
            else if (MatchRepository.result(Choice, p1.choice) == -1) {
                MatchRepository.updateResult(matchId, req.user.id);
                res.status(200).json({ message: "You lose" });
            }
            else {
                MatchRepository.updateResult(matchId, 0);
                res.status(200).json({ message: "Draw" });
            }
        }
        else {
            this.userChoices.set(matchId, { choice: Choice, playerId: req.user.id });
            res.status(200).json({ message: "Waiting for opponent to choose..." });
        }

    }
}