import dataSource from "../../services/db/dataSource";
import { Score } from "./Score.entity";
import { User } from "../user/User.entity";
import { UserRepository } from "../user/User.repository";
export const ScoreRepository = dataSource.getRepository(Score).extend({
    async scoreUpdate(score:number, status: boolean, description:string,user: User){
        await ScoreRepository.save({
            score: score,
            status: status,
            description: description,
            user: user
        })
        if(status){
            user.totalScore += score
        }
        else user.totalScore -= score
        await UserRepository.save(user)
    }
});
