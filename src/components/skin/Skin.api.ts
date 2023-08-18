import { ClassMiddleware, Controller, Post } from "@overnightjs/core";
import UserMiddleware from "../user/User.middleware";
import { NextFunction, Response, Request } from "express";
import { SkinRepository } from "./Skin.repository";

@Controller("api/skin")
@ClassMiddleware([UserMiddleware.checkAuth])
export class SkinAPI {
    @Post("purchase/:id")
    public async purchase(req: Request, res: Response, next: NextFunction) {
        try {
            await SkinRepository.purchase(res.locals.user, parseInt(req.params.id));
            res.status(200).json({ message: "Purchase successful" });
        } catch (error) {
            res.status(200).json({ message: "Purchase failed" });
        }
    }
    @Post("pick")
    public async skinPick(req: Request, res: Response, next: NextFunction) {
        const { Rock, Scissors, Paper } = req.body;
        try {
            await SkinRepository.pickSkin(res.locals.user, Rock, Scissors, Paper)
            res.status(200).json({ message: "Picked" });
        } catch (error) {
        }
    }
}