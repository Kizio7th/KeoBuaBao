import dataSource from "../../../services/db/dataSource";
import { Day } from "./Day.entity";

export const DayRepository = dataSource.getRepository(Day).extend({
    
})