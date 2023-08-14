import cron from 'node-cron';
import { UserRepository } from '../../components/user/User.repository';
import { DayRepository } from '../../components/time/day/Day.repository';
import { DailyRankRepository } from '../../components/rank/daily/DailyRank.repository';



export const increaseTurn = cron.schedule("0 0 * * *", async () => {
    try {
        await UserRepository.increaseTurn(5);
    } catch (error) {
        console.log(error);
    }
});
export const updateDailyRank = cron.schedule("0 0 * * *", async () => {
    try {
        const day = await DayRepository.save({ time: new Date() });
        const users = await UserRepository.find();
        for (const i of users) {
            await DailyRankRepository.save({
                user: i,
                day: day,
                score: i.totalScore
            })
        }
        const ranks = await DailyRankRepository.find();
        ranks.sort((a, b) => b.score - a.score);
        for (let i = 0; i < ranks.length; i++) {
            ranks[i].rank = i + 1;
            await DailyRankRepository.save(ranks[i]);
        }
    } catch (error) {

    }
});