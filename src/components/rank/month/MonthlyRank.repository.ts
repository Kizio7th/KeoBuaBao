import dataSource from "../../../services/db/dataSource";
import { MonthlyRank } from "./MonthlyRank.entity";

export const MonthlyRankRepository = dataSource.getRepository(MonthlyRank).extend({
    
})