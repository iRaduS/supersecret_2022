import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserFactory } from "Database/factories";

export default class UserSeeder extends BaseSeeder {
  public async run () {
    await UserFactory.merge({
      name: 'Normal User',
      email: 'user@uni.dev',
      password: 'user1234',
      role: 'Basic'
    }).create()

    await UserFactory.merge({
      name: 'Admin User',
      email: 'admin@uni.dev',
      password: 'admin1234',
      role: 'Admin'
    }).create()
  }
}
