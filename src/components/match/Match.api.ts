import { ClassMiddleware, Controller, Get, Post } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import { MatchRepository } from "./Match.repository";
import UserMiddleware from "../user/User.middleware";
import SocketEmitter from "../../services/socket/Emitter";
import { FindMatchRepository } from "../findMatch/FindMatch.repository";

@Controller("api/match")
@ClassMiddleware([UserMiddleware.checkAuth])
export class MatchAPI {
    private userChoices: Map<number, { choice: string, playerId: number }> = new Map();
    private sendResult(result: string, status: number, matchId: number) {
        SocketEmitter.emit('match-result', { result: result, status: status, matchId: matchId });
    }
    @Post(":id")
    public async match(req: Request, res: Response, next: NextFunction) {
        const matchId = parseInt(req.params.id)
        const { Choice } = req.body;
        if (this.userChoices.has(matchId)) {
            const p1 = this.userChoices.get(matchId);
            if (MatchRepository.result(Choice, p1.choice) == 1) {
                MatchRepository.updateResult(matchId, res.locals.user.id);
                res.status(200).json({ message: "You win", status: 1 });
                this.sendResult("You lose", 0, matchId);
            }
            else if (MatchRepository.result(Choice, p1.choice) == -1) {
                MatchRepository.updateResult(matchId, res.locals.user.id);
                res.status(200).json({ message: "You lose", status: 1 });
                this.sendResult("You win", 0, matchId);
            }
            else {
                MatchRepository.updateResult(matchId, 0);
                res.status(200).json({ message: "Draw", status: 1 });
                this.sendResult("Draw", 0, matchId);
            }
        }
        else {
            this.userChoices.set(matchId, { choice: Choice, playerId: res.locals.user.id });
            res.status(200).json({ message: "Waiting for opponent to choose...", status: 0 });
        }

    }
    @Get("giveUp/:id")
    public async giveUp(req: Request, res: Response, next: NextFunction) {
        const matchId = parseInt(req.params.id)
        const match = await MatchRepository.findOne({ where: { id: matchId } })
        const findMatchs = await FindMatchRepository.find({ where: { match: match } });
        for (const i of findMatchs) {
            if (i.user.id != res.locals.user.id) {
                MatchRepository.updateResult(matchId, i.user.id)
                this.sendResult("You win, your opponent has given up", 0, matchId);
                break;
            }
        }

    }
}