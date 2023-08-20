import cron from 'node-cron';
import { UserRepository } from '../../components/user/User.repository';
import { DayRepository } from '../../components/time/day/Day.repository';
import { DailyRankRepository } from '../../components/rank/daily/DailyRank.repository';
import { WeekRepository } from '../../components/time/week/Week.repository';
import { Between } from 'typeorm';
import { WeeklyRankRepository } from '../../components/rank/weekly/WeeklyRank.repository';
import { MonthlyRankRepository } from '../../components/rank/month/MonthlyRank.repository';
import { MonthRepository } from '../../components/time/month/Month.repositort';
import { DailyRank } from '../../components/rank/daily/DailyRank.entity';
import { WeeklyRank } from '../../components/rank/weekly/WeeklyRank.entity';
import { MonthlyRank } from '../../components/rank/month/MonthlyRank.entity';


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

        const day = await DayRepository.save({ time: today });
        const users = await UserRepository.find();
        const ranks = [];
        for (const i of users) {
            const dailyRank = new DailyRank();
            dailyRank.user = i;
            dailyRank.day = day;
            dailyRank.score = i.totalScore;
            ranks.push(dailyRank);
        }

        const preDay = await DayRepository.findOne({ where: { time: Between(yesterday, today) } })
        if (preDay) {
            for (const i of ranks) {
                const preRank = await DailyRankRepository.findOne({ where: { user: i.user, day: preDay } })
                if (preRank) i.score -= preRank.score
            }
        }
        ranks.sort((a, b) => b.score - a.score);
        for (let i = 0; i < ranks.length; i++) {
            ranks[i].rank = i + 1;
            await DailyRankRepository.save(ranks[i]);
        }
    } catch (error) {
        console.log(error)
    }
});
export const updateWeeklyRank = cron.schedule("0 0 * * 1", async () => {
    try {
        const thisWeek = new Date();
        const lastWeek = new Date(thisWeek);
        lastWeek.setDate(lastWeek.getDate() - 7);

        const week = await WeekRepository.save({ time: thisWeek });
        const users = await UserRepository.find();
        const ranks = [];
        for (const i of users) {
            const weeklyRank = new WeeklyRank();
            weeklyRank.user = i;
            weeklyRank.week = week;
            weeklyRank.score = i.totalScore;
            ranks.push(weeklyRank);
        }

        const preWeek = await WeekRepository.findOne({ where: { time: Between(lastWeek, thisWeek) } })
        if (preWeek) {
            for (const i of ranks) {
                const preRank = await WeeklyRankRepository.findOne({ where: { user: i.user, week: preWeek } });
                if (preRank) i.score -= preRank.score
            }
        }
        ranks.sort((a, b) => b.score - a.score);
        for (let i = 0; i < ranks.length; i++) {
            ranks[i].rank = i + 1;
            await WeeklyRankRepository.save(ranks[i]);
        }
    } catch (error) {
        console.log(error)
    }
});
export const updateMonthlyRank = cron.schedule("0 0 1 * * *", async () => {
    try {
        const thisMonth = new Date();
        let daysInMonth = new Date(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 0).getDate();
        const lastMonth = new Date(thisMonth);
        lastMonth.setDate(lastMonth.getDate() - daysInMonth);

        const month = await MonthRepository.save({ time: thisMonth });
        const users = await UserRepository.find();
        const ranks = [];
        for (const i of users) {
            const monthlyRank = new MonthlyRank();
            monthlyRank.user = i;
            monthlyRank.month = month;
            monthlyRank.score = i.totalScore;
            ranks.push(monthlyRank);
        }

        const preMonth = await MonthRepository.findOne({ where: { time: Between(lastMonth, thisMonth) } })
        if (preMonth) {
            for (const i of ranks) {
                const preRank = await MonthlyRankRepository.findOne({ where: { user: i.user, month: preMonth } });
                if (preRank) i.score -= preRank.score
            }

        }
        ranks.sort((a, b) => b.score - a.score);
        for (let i = 0; i < ranks.length; i++) {
            ranks[i].rank = i + 1;
            await MonthlyRankRepository.save(ranks[i]);
        }
    } catch (error) {
        console.log(error)
    }
});
