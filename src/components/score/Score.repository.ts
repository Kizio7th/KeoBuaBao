import dataSource from "../../services/db/dataSource";
import { Score } from "./Score.entity";
import { User } from "../user/User.entity";
import { UserRepository } from "../user/User.repository";
export const ScoreRepository = dataSource.getRepository(Score).extend({
    async scoreUpdate(score: number, status: boolean, description: string, user: User) {
        await ScoreRepository.save({
            score: score,
            status: status,
            description: description,
            user: user
        })
        if (status) user.totalScore += score
        else user.totalScore -= score
        if (user.totalScore < 0) user.totalScore = 0;
        await UserRepository.save(user)
    },
    async tradeScore(user: User) {
        if(user.totalScore <= 0 ) return "Trade failed, you have no score"
        try {
            user.turn += 2;
            this.scoreUpdate(1, false, "Trade point to turns", user)
            await this.save(user)
            return "Trade successful"
        } catch (error) {
            console.log(error)
        }
        return "Trade failed"
    }
});
