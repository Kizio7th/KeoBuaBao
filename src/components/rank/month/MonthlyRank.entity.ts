import { Column, Entity } from "typeorm";
import { User } from "../../user/User.entity";

@Entity("monthly_rank")
export class MonthlyRank extends User{
    @Column()
    date: Date
    @Column()
    rank: number
}