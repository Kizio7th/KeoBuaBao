import cron from 'node-cron';
import { UserRepository } from '../../components/user/User.repository';



export const increaseTurn = cron.schedule("0 0 * * *", async () => {
    try {
        await UserRepository.increaseTurn(5);
    } catch (error) {
        console.log(error);
    }
});
