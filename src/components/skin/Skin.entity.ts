import { Column, Double, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inventory } from "../inventory/Inventory.entity";

@Entity("name:skin")
export class Skin {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    category: string
    @Column()
    description: string
    @Column()
    price: Double
    @OneToMany(() => Inventory, (inventory) => inventory.skin, { cascade: true })
    inventory: Inventory[]
}