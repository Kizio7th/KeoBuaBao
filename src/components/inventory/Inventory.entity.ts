import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/User.entity";
import { Skin } from "../skin/Skin.entity";
import { SkinPick } from "../skinPick/SkinPick.entity";

@Entity("inventory")
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(() => User, (user) => user.inventory, { eager: true, onDelete: 'CASCADE' })
    user: User
    @ManyToOne(() => Skin, (skin) => skin.inventory, { eager: true, onDelete: 'CASCADE' })
    skin: Skin
    @OneToOne(() => SkinPick, (skinPick) => skinPick.inventory )
    @JoinColumn()
    skinPicks: SkinPick
}