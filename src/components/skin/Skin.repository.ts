import dataSource from "../../services/db/dataSource";
import { Skin } from "./Skin.entity";
import { User } from "../user/User.entity";
import { InventoryRepository } from "../inventory/Inventory.repository";
import { SkinPickRepository } from "../skinPick/SkinPick.reposittory";
export const SkinRepository = dataSource.getRepository(Skin).extend({
    async purchase(user: User, skinId: number) {
        InventoryRepository.save({
            user: user,
            skin: await this.findOne({ where: { id: skinId } })
        })
    },
    async pickSkin(user: User, rockId: string, scissorsId: string, paperId: string) {
        const rock = this.findOne({ where: { id: rockId } })
        const scissors = this.findOne({ where: { id: scissorsId } })
        const paper = this.findOne({ where: { id: paperId } })
        const checkRock = await InventoryRepository.findOne({ where: { user: user, skin: rock } })
        const checkScissors = await InventoryRepository.findOne({ where: { user: user, skin: scissors } })
        const checkPaper = await InventoryRepository.findOne({ where: { user: user, skin: paper } })
        if (checkRock) {
            SkinPickRepository.save({
                id: 1,
                user: user,
                inventory: checkRock
            })
        }
        if (checkScissors) {
            SkinPickRepository.save({
                id: 2,
                user: user,
                inventory: checkScissors
            })
        }
        if (checkPaper) {
            SkinPickRepository.save({
                id: 3,
                user: user,
                inventory: checkPaper
            })
        }
    },
})