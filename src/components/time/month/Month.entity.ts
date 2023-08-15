import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MonthlyRank } from "../../rank/month/MonthlyRank.entity";

@Entity({ name: 'month' })
export class Month {
    @PrimaryGeneratedColumn()
    id:number
    @Column({ type: "datetime", nullable: true })
    startTime: Date
    @OneToMany(() => MonthlyRank, (monthlyRank) => monthlyRank.month, { cascade: true })
    monthlyRank: MonthlyRank[]
}