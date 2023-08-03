/* eslint-disable max-len */
import { DataSource } from 'typeorm';
import { User } from '../../components/user/User.entity';
import { Skin } from '../../components/skin/Skin.entity';
import { Match } from '../../components/match/Match.entity';
import { SkinPick } from '../../components/skinPick/SkinPick.entity';
import { Inventory } from '../../components/inventory/Inventory.entity';
import { FindMatch } from '../../components/findMatch/FindMatch.entity';
import { Score } from '../../components/score/Score.entity';
import { DailyRank } from '../../components/rank/daily/DailyRank.entity';
import { WeeklyRank } from '../../components/rank/weekly/WeeklyRank.entity';
import { MonthlyRank } from '../../components/rank/month/MonthlyRank.entity';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  maxQueryExecutionTime: 20000,
  charset: 'utf8mb4',
  entities: [
    User,
    Skin,
    Match,
    SkinPick,
    Inventory,
    FindMatch,
    Score,
    DailyRank,
    WeeklyRank,
    MonthlyRank
  ],
  cache: {
    // type: 'ioredis',
    // duration: 60000,
    // options: {
    //   host: process.env.REDIS_HOST,
    //   port: process.env.REDIS_PORT,
    //   password: process.env.REDIS_PASSWORD,
    // }
  }
})

export default dataSource
