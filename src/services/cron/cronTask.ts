import cron from 'node-cron';
import { UserRepository } from '../../components/user/User.repository';
import { DayRepository } from '../../components/time/day/Day.repository';
import { DailyRankRepository } from '../../components/rank/daily/DailyRank.repository';
import { WeekRepository } from '../../components/time/week/Week.repository';



export const increaseTurn = cron.schedule("0 0 * * *", async () => {
    try {
        await UserRepository.increaseTurn(5);
    } catch (error) {
        console.log(error);
    }
});
export const updateDailyRank = cron.schedule("0 0 * * *", async () => {
    try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const preDay = await DayRepository.findOne({ where: { time: yesterday } })
        if (preDay) {
            const preRank = await DailyRankRepository.find({ where: { day: preDay } });
            for (const i of preRank) {
                i.score = i.user.totalScore - i.score;
            }
            preRank.sort((a, b) => b.score - a.score);
            for (let i = 0; i < preRank.length; i++) {
                preRank[i].rank = i + 1;
                await DailyRankRepository.save(preRank[i]);
            }
        }
        const day = await DayRepository.save({ time: new Date() });
        const users = await UserRepository.find();
        for (const i of users) {
            await DailyRankRepository.save({
                user: i,
                day: day,
                score: i.totalScore
            })
        }
    } catch (error) {

    }
});
// export const updateWeeklyRank = cron.schedule("0 0 * * 1", async () => {
//     try {
//         const yesterday = new Date();
//         yesterday.setDate(yesterday.getDate() - 1);
//         const preDay = await DayRepository.findOne({ where: { time: yesterday } })
//         if (preDay) {
//             const preRank = await DailyRankRepository.find({ where: { day: preDay } });
//             for (const i of preRank) {
//                 i.score = i.user.totalScore - i.score;
//             }
//             preRank.sort((a, b) => b.score - a.score);
//             for (let i = 0; i < preRank.length; i++) {
//                 preRank[i].rank = i + 1;
//                 await DailyRankRepository.save(preRank[i]);
//             }
//         }
//         const day = await DayRepository.save({ time: new Date() });
//         const users = await UserRepository.find();
//         for (const i of users) {
//             await DailyRankRepository.save({
//                 user: i,
//                 day: day,
//                 score: i.totalScore
//             })
//         }
//     } catch (error) {

//     }
// });
