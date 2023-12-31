import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FindMatch } from "../findMatch/FindMatch.entity";
import { Inventory } from "../inventory/Inventory.entity";
import { Score } from "../score/Score.entity";
import { SkinPick } from "../skinPick/SkinPick.entity";
import { DailyRank } from "../rank/daily/DailyRank.entity";
import { WeeklyRank } from "../rank/weekly/WeeklyRank.entity";
import { MonthlyRank } from "../rank/month/MonthlyRank.entity";

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column()
  avatar: string;
  @Column()
  turn: number;
  @Column()
  password: string;
  @OneToMany(() => Inventory, (inventory) => inventory.user, { cascade: true })
  inventory: Inventory[]
  @OneToMany(() => SkinPick, (skinPick) => skinPick.user, { cascade: true })
  skinPicks: SkinPick[]
  @OneToMany(() => FindMatch, (findMatch) => findMatch.user, { cascade: true })
  findMatch: FindMatch[]
  @OneToMany(() => Score, (score) => score.user, { cascade: true })
  scores: Score[]
  @OneToMany(() => DailyRank, (dailyRank) => dailyRank.user, { cascade: true })
  dailyRank: DailyRank[]
  @OneToMany(() => WeeklyRank, (weeklyRank) => weeklyRank.user, { cascade: true })
  weeklyRank: WeeklyRank[]
  @OneToMany(() => MonthlyRank, (monthlyRank) => monthlyRank.user, { cascade: true })
  monthlyRank: MonthlyRank[]
  @Column()
  totalScore: number
}
