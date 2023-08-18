import { Not } from "typeorm";
import dataSource from "../../services/db/dataSource";
import { FindMatchRepository } from "../findMatch/FindMatch.repository";
import { ScoreRepository } from "../score/Score.repository";
import { UserRepository } from "../user/User.repository";
import { Match } from "./Match.entity";

export const MatchRepository = dataSource.getRepository(Match).extend({
    async updateResult(matchId: number, result: number) {
        const match = await this.findOne({ where: { id: matchId } });
        if (result != 0) {
            const winner = await UserRepository.findOne({ where: { id: result } });
            const loser = (await FindMatchRepository.findOne({ where: { match: match, user: Not(result) } })).user
            ScoreRepository.scoreUpdate(1, true, "Win match " + matchId, winner);
            ScoreRepository.scoreUpdate(1, false, "Lose match " + matchId, loser);
        }
        match.result = result;
        match.endTime = new Date();
        return this.save(match);
    },
    result(choice1: string, choice2: string) {
        if (choice1 === choice2) {
            return 0;
        } else if (
            (choice1 === "rock" && choice2 === "scissors") ||
            (choice1 === "scissors" && choice2 === "paper") ||
            (choice1 === "paper" && choice2 === "rock")
        )
            return 1;
        else return -1;
    },
});
