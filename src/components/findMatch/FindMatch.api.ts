import { ClassMiddleware, Controller, Get } from "@overnightjs/core";
import { NextFunction, Response, Request } from "express";
import { FindMatchRepository } from "./FindMatch.repository";
import { User } from "../user/User.entity";
import UserMiddleware from "../user/User.middleware";
import SocketEmitter from "../../services/socket/Emitter";
import { UserRepository } from "../user/User.repository";


@Controller("api/findMatch")
@ClassMiddleware([UserMiddleware.checkAuth])
export class FindMatchAPI {
    private waiting: Set<number> = new Set();
    private sendMatch(matchId: number) {
        SocketEmitter.emit('matching', { matchId: matchId });
    }
    @Get("matching")
    public async matching(req: Request, res: Response, next: NextFunction) {
        if ((await UserRepository.findOne({ where: { id: res.locals.user.id } })).turn != 0) {
            this.waiting.add(res.locals.user.id);
            if (this.waiting.size >= 2) {
                try {
                    let array = Array.from(this.waiting);
                    this.waiting.clear();
                    let match = await FindMatchRepository.matching(array[array.length - 1], array[array.length - 2]);
                    res.status(200).json({ message: "Match found - " + match.id, matchId: match.id });
                    this.sendMatch(match.id);
                } catch (error) {
                    console.log(error);
                }
            }
            else res.status(200).json({ message: "Finding the other player..." });
        }
        else res.status(200).json({ message: "You have no turn!!!", status: 0 });

    }
    
}