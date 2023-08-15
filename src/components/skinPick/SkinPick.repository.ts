import dataSource from "../../services/db/dataSource";
import { SkinPick } from "./SkinPick.entity";

export const SkinPickRepository = dataSource.getRepository(SkinPick).extend({
    
})