import cron from 'node-cron';
import { UserRepository } from '../../components/user/User.repository';
import { DayRepository } from '../../components/time/day/Day.repository';
import { DailyRankRepository } from '../../components/rank/daily/DailyRank.repository';
import { WeekRepository } from '../../components/time/week/Week.repository';
import { Between } from 'typeorm';
import { WeeklyRankRepository } from '../../components/rank/weekly/WeeklyRank.repository';
import { MonthlyRankRepository } from '../../components/rank/month/MonthlyRank.repository';
import { MonthRepository } from '../../components/time/month/Month.repositort';


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
        console.log(error)
    }
});
export const updateMonthlyRank = cron.schedule("0 0 1 * *", async () => {
    try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const nextMonth = currentMonth + 1;
        const lastDayOfMonth = new Date(currentDate.getFullYear(), nextMonth, 0).getDate();
        const thisMonth = new Date();
        const preMonth = new Date(thisMonth);
        preMonth.setDate(preMonth.getDate() - lastDayOfMonth);
        const startTime = await MonthRepository.findOne({ where: { startTime: Between(preMonth, thisMonth) } })
        if (startTime) {
            const preRank = await MonthlyRankRepository.find({ where: { month: startTime } });
            for (const i of preRank) {
                i.score = i.user.totalScore - i.score;
            }
            preRank.sort((a, b) => b.score - a.score);
            for (let i = 0; i < preRank.length; i++) {
                preRank[i].rank = i + 1;
                await MonthlyRankRepository.save(preRank[i]);
            }
        }
        const month = await MonthRepository.save({ startTime: new Date() });
        const users = await UserRepository.find();
        for (const i of users) {
            await MonthlyRankRepository.save({
                user: i,
                startTime: month,
                score: i.totalScore
            })
        }
    } catch (error) {
        console.log(error)
    }
});
