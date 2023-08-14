import dataSource from "../../services/db/dataSource";
import { Inventory } from "./Inventory.entity";

export const InventoryRepository = dataSource.getRepository(Inventory).extend({
    
})