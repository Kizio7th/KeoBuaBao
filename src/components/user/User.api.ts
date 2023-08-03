import { Controller, Get, Post } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpStatusCode } from "axios";
import { UserRepository } from "./User.repository";
import { CustomRequest } from "../../types/customRequest";

@Controller("api/user")
export class UserAPI {
    @Post("register")
    public async register(req: Request, res: Response, next: NextFunction) {
        const { Name, Avatar, Password } = req.body;
        const user = await UserRepository.addUser(Name, Avatar, Password);
        res.send({ user });
    }
    @Get("login")
    public async login(req: Request, res: Response, next: NextFunction) {
        const { Name, Password } = req.body;
        const user = await UserRepository.verification(Name, Password);
        if (!user) return res.sendStatus(HttpStatusCode.Forbidden);
        const token = jwt.sign(
            {
                user,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "3h",
            }
        );
        return res.send(token);
    }
    @Get("tradePoint")
    public tradePoint(req:CustomRequest, res: Response, next: NextFunction){
        res.send(UserRepository.tradeScore(req.user))
    }
}
