import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/User.entity";
import { Day } from "../../time/day/Day.entity";

@Entity("daily_rank")
export class DailyRank {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    rank: number
    @ManyToOne(() => User, (user) => user.dailyRank, { eager: true, onDelete: 'CASCADE' })
    user: User
    @ManyToOne(() => Day, (day) => day.dailyRank, { eager: true, onDelete: 'CASCADE' })
    day: Day
}