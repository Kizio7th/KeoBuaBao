import { ClassMiddleware, Controller, Get } from "@overnightjs/core";
import { CustomRequest } from "../../types/customRequest";
import { NextFunction, Response } from "express";
import { FindMatchRepository } from "./FindMatch.repository";
import { User } from "../user/User.entity";
import UserMiddleware from "../user/User.middleware";


@Controller("api/matchmaking")
@ClassMiddleware([UserMiddleware.checkAuth])
export class FindMatchAPI {
    private waiting: User[] = [];
    @Get("matching")
    public async matching(req: CustomRequest, res: Response, next: NextFunction) {
        this.waiting.push(req.user);
        if (this.waiting.length >= 2) {
            try {
                let match = await FindMatchRepository.matching(this.waiting.shift(), this.waiting.shift());
                res.status(200).json({ message: "Match found - ID: " + match.id });
            } catch (error) {
                console.log(error);
            }
        }
        else res.status(200).json({ message: "Finding the other player..." });
    }
}