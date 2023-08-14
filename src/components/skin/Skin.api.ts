import { ClassMiddleware, Controller, Post } from "@overnightjs/core";
import UserMiddleware from "../user/User.middleware";
import { CustomRequest } from "../../types/customRequest";
import { NextFunction, Response } from "express";
import { SkinRepository } from "./Skin.repository";

@Controller("api/skin")
@ClassMiddleware([UserMiddleware.checkAuth])
export class SkinAPI {
    @Post("purchase/:id")
    public async purchase(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            await SkinRepository.purchase(req.user,parseInt(req.params.id));
            res.status(200).json({ message: "Purchase successful" });
        } catch (error) {
            res.status(200).json({ message: "Purchase failed" });
        }
    }
    @Post("pick")
    public async skinPick(req: CustomRequest, res: Response, next: NextFunction){
        const {Rock, Scissors, Paper} = req.body;
        try {
            await SkinRepository.pickSkin(req.user, Rock, Scissors, Paper)
            res.status(200).json({ message: "Picked" });
        } catch (error) {
        }
    }
}