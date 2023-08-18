import dataSource from "../../services/db/dataSource";
import { FindMatch } from "./FindMatch.entity";
import { User } from "../user/User.entity";
import { MatchRepository } from "../match/Match.repository";
import { UserRepository } from "../user/User.repository";

export const FindMatchRepository = dataSource.getRepository(FindMatch).extend({
    async matching(p1Id: number, p2Id: number) {
        const player1 = await UserRepository.findOne({ where: { id: p1Id } })
        const player2 = await UserRepository.findOne({ where: { id: p2Id } })
        const match = await MatchRepository.save({
            startTime: new Date()
        })
        this.save({
            user: player1,
            match: match
        })
        this.save({
            user: player2,
            match: match
        })
        return match;
    }
})