import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/User.entity";
import { Month } from "../../time/month/Month.entity";

@Entity("monthly_rank")
export class MonthlyRank {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    rank: number
    @Column()
    score:number
    @ManyToOne(() => User, (user) => user.monthlyRank, { eager: true, onDelete: 'CASCADE' })
    user: User
    @ManyToOne(() => Month, (month) => month.monthlyRank, { eager: true, onDelete: 'CASCADE' })
    month: Month
}