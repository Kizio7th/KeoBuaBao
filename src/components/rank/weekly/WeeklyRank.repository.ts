import dataSource from "../../../services/db/dataSource";
import { WeeklyRank } from "./WeeklyRank.entity";

export const WeeklyRankRepository = dataSource.getRepository(WeeklyRank).extend({
})