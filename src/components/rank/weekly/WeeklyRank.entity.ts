import { Column, Entity } from "typeorm";
import { User } from "../../user/User.entity";

@Entity("weely_rank")
export class WeeklyRank extends User{
    @Column()
    date: Date
    @Column()
    rank: number
}