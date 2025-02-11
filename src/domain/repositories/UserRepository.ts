import { User } from "../entities/User";

export interface UserRepository {
  getUsers(): Promise<User[]>;
  createUsers(users: User[]): Promise<void>;
}
