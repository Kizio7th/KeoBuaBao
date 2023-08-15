import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/User.entity";
import { Week } from "../../time/week/Week.entity";

@Entity("weekly_rank")
export class WeeklyRank {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    rank: number
    @Column()
    score:number
    @ManyToOne(() => User, (user) => user.weeklyRank, { eager: true, onDelete: 'CASCADE' })
    user: User
    @ManyToOne(() => Week, (week) => week.weeklyRank, { eager: true, onDelete: 'CASCADE' })
    week: Week
}