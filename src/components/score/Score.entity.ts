import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/User.entity";

@Entity("name:score")
export class Score{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    score: number
    @Column()
    status: boolean
    @Column()
    description: string
    @ManyToOne( () => User, (user) => user.scores, { eager: true, onDelete: 'CASCADE'  })
    user: User
    
}