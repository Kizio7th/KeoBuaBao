import dataSource from "../../../services/db/dataSource";
import { DailyRank } from "./DailyRank.entity";

export const DailyRankRepository = dataSource.getRepository(DailyRank).extend ({
    sortDailyRanking(ranks: DailyRank[]): DailyRank[] {
        ranks.sort((a, b) => {

            if (a.totalScore !== b.totalScore) {
                return b.totalScore - a.totalScore;
            }

            return a.date.getTime() - b.date.getTime();
        });
        for (let i = 0; i < ranks.length; i++) {
            ranks[i].rank = i + 1;
        }
        return ranks;
    }
})