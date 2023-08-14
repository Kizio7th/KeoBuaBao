import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DailyRank } from "../../rank/daily/DailyRank.entity";

@Entity({ name: 'day' })
export class Day {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    time: Date
    @OneToMany(() => DailyRank, (dailyRank) => dailyRank.day, { cascade: true })
    dailyRank: DailyRank[]
}