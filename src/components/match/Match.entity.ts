import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FindMatch } from "../findMatch/FindMatch.entity";

@Entity("match")
export class Match {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: "datetime" })
    startTime: Date
    @Column({ type: "datetime", nullable: true })
    endTime: Date
    @Column({ nullable: true })
    result: number
    @OneToMany(() => FindMatch, (findMatch) => findMatch.match, { cascade: true })
    findMatch: FindMatch[]
}