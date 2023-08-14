import dataSource from "../../services/db/dataSource";
import { Score } from "../score/Score.entity";
import { ScoreRepository } from "../score/Score.repository";
import { User } from "./User.entity";
import bcrypt from "bcrypt";

export const UserRepository = dataSource.getRepository(User).extend({
  async findByname(name) {
    return await this.findOne({ where: { name: name } });
  },
  async addUser(name: string, avatar: string, password: string) {
    try {
      if (await this.findByname(name)) return "Nickname already exist! Choose another one."
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.save({
        name: name,
        avatar: avatar,
        password: hashedPassword,
        turn: 5,
        totalScore: 0
      });
      return "New User created: " + user.name;
    } catch (error) {
      console.error(error);
    }
    return "Create account failed"
  },
  async verification(name: string, password: string) {
    const user = await this.findByname(name);
    if (!user) return false;
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    return false;
  },
  async increaseTurn(turn: number) {
    try {
      const users = await this.find();
      for (const user of users) {
        user.turn += turn;
        await this.save(user);
      }
    } catch (error) {
      console.log(error)
    }
  },
})
