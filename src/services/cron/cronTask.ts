import cron from 'node-cron';
import { UserRepository } from '../../components/user/User.repository';
import { DayRepository } from '../../components/time/day/Day.repository';
import { DailyRankRepository } from '../../components/rank/daily/DailyRank.repository';
import { WeekRepository } from '../../components/time/week/Week.repository';
import { Between } from 'typeorm';
import { WeeklyRankRepository } from '../../components/rank/weekly/WeeklyRank.repository';


export const increaseTurn = cron.schedule("0 0 * * *", async () => {
    try {
        await UserRepository.increaseTurn(5);
    } catch (error) {
        console.log(error);
    }
});
export const updateDailyRank = cron.schedule("0 0 * * *", async () => {
    try {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const preDay = await DayRepository.findOne({ where: { time: Between(yesterday, today) } })
        console.log(preDay)
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
        console.log(error)
    }
});
export const updateWeeklyRank = cron.schedule("0 0 * * 1", async () => {
    try {
        const thisWeek = new Date();
        const preWeek = new Date(thisWeek);
        preWeek.setDate(preWeek.getDate() - 7);
        const startTime = await WeekRepository.findOne({ where: { startTime: Between(preWeek, thisWeek) } })
        if (startTime) {
            const preRank = await WeeklyRankRepository.find({ where: { week: startTime } });
            for (const i of preRank) {
                i.score = i.user.totalScore - i.score;
            }
            preRank.sort((a, b) => b.score - a.score);
            for (let i = 0; i < preRank.length; i++) {
                preRank[i].rank = i + 1;
                await WeeklyRankRepository.save(preRank[i]);
            }
        }
        const week = await WeekRepository.save({ startTime: new Date() });
        const users = await UserRepository.find();
        for (const i of users) {
            await WeeklyRankRepository.save({
                user: i,
                startTime: week,
                score: i.totalScore
            })
        }
    } catch (error) {

    }
});
