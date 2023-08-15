import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WeeklyRank } from "../../rank/weekly/WeeklyRank.entity";

@Entity({ name: 'week' })
export class Week {
    @PrimaryGeneratedColumn()
    id:number
    @Column({ type: "datetime", nullable: true })
    startTime: Date
    @Column({ type: "datetime", nullable: true })
    endTime: Date
    @OneToMany(() => WeeklyRank, (weeklyRank) => weeklyRank.week, { cascade: true })
    weeklyRank: WeeklyRank[]
}