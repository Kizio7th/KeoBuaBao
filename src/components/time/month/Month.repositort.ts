import dataSource from "../../../services/db/dataSource";
import { Month } from "./Month.entity";

export const MonthRepository = dataSource.getRepository(Month).extend({
    
})