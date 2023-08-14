import { Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/User.entity";
import { Match } from "../match/Match.entity";
import { Inventory } from "../inventory/Inventory.entity";

@Entity("skin_pick")
export class SkinPick {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(() => User, (user) => user.skinPicks, { eager: true })
    user: User
    @OneToOne(() => Inventory, (inventory) => inventory.skinPicks, { cascade: true })
    inventory: Inventory
}