import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FindMatch} from "../findMatch/FindMatch.entity";

@Entity("name:match")
export class Match{
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: "datetime" })
    startTime: Date
    @Column({ type: "datetime" })
    endTime: Date
    @Column()
    result: number
    @OneToMany(() => FindMatch, (findMatch) => findMatch.match, { cascade: true })
    findMatch: FindMatch[]
}