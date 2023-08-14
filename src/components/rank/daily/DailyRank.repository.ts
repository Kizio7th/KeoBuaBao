import dataSource from "../../../services/db/dataSource";
import { DailyRank } from "./DailyRank.entity";

export const DailyRankRepository = dataSource.getRepository(DailyRank).extend({
})