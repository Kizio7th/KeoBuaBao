import dataSource from "../../services/db/dataSource";
import { FindMatch } from "./FindMatch.entity";
import { User } from "../user/User.entity";
import { MatchRepository } from "../match/Match.repository";

export const FindMatchRepository = dataSource.getRepository(FindMatch).extend({
    async matching(player1: User, player2: User) {
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