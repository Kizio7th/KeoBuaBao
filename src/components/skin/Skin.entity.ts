import { Column, Double, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inventory } from "../inventory/Inventory.entity";

@Entity("skin")
export class Skin {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    category: string
    @Column()
    description: string
    @Column()
    price: number
    @OneToMany(() => Inventory, (inventory) => inventory.skin, { cascade: true })
    inventory: Inventory[]
}