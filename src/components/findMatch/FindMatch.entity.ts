import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/User.entity";
import { Match } from "../match/Match.entity";

@Entity("find_match")
export class FindMatch {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(() => User, (user) => user.findMatch, { eager: true, onDelete: 'CASCADE' })
    user: User
    @ManyToOne(() => Match, (match) => match.findMatch, { eager: true, onDelete: 'CASCADE' })
    match: Match

}