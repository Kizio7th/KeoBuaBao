import dataSource from "../../services/db/dataSource";
import { ScoreRepository } from "../score/Score.repository";
import { UserRepository } from "../user/User.repository";
import { Match } from "./Match.entity";

export const MatchRepository = dataSource.getRepository(Match).extend({
    async updateResult(matchId: number, result: number) {
        const match = await this.findOne(matchId);
        if (match) {
            match.result = result;
            match.endTime = new Date();
            if (match.result != 0) {
                ScoreRepository.scoreUpdate(
                    1,
                    true,
                    "Win match" + matchId,
                    await UserRepository.findOne({ where: { id: result } })
                );
                ScoreRepository.scoreUpdate(
                    1,
                    false,
                    "Lose match" + matchId,
                    match.findMatch[0].filter((user) => user.id !== result)[0]
                );
            }
            return await this.save(match);
        }
        return null;
    },
    async checkResult(match: Match, playerId: number) {
        if (match.result == playerId) return "You win";
        else if (match.result == 0) return "Draw";
        else return "You lose";
    },
    result(choice1: string, choice2: string) {
        if (choice1 === choice2) {
            return 0;
        } else if (
            (choice1 === "rock" && choice2 === "scissors") ||
            (choice1 === "scissors" && choice2 === "rock") ||
            (choice1 === "rock" && choice2 === "rock")
        )
            return 1;
        else return -1;
    },
});
