import dataSource from "../../../services/db/dataSource";
import { Week } from "./Week.entity";

export const WeekRepository = dataSource.getRepository(Week).extend({
    
})