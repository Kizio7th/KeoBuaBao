import { Column, Entity } from "typeorm";
import { User } from "../../user/User.entity";

@Entity("daily_rank")
export class DailyRank extends User{
    @Column()
    date: Date
    @Column()
    rank: number
}