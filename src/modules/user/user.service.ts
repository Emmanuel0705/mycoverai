import { User, UserRole } from '@app/database/models/user.model';
import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { config } from 'dotenv';
config();

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    private readonly mailerService: MailerService,
  ) {}
  @Cron(CronExpression.EVERY_5_MINUTES)
  async sendingPolicyPurchaseEmail(): Promise<void> {
    try {
      //  fetch customer
      const customers = await this.usersRepository.findAll({
        where: { role: UserRole.Customer },
      });

      //  get a week ago date
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      //  // Loop through customers and check policy purchase date
      customers.forEach(async (customer: User) => {
        if (customer?.lastPolicyPurchaseDate >= oneWeekAgo) {
          // sending mail to the user
          this.mailerService.sendMail({
            to: customer.email,
            from: process.env.EMAIL_SENDER_ID,
            subject: 'Policy purchase feedback', // Subject line
            html: '<b>Please leave feedback for your recent policy purchase</b>', // HTML body content
          });
        }
      });
    } catch (error) {
      new Error(error?.message);
    }
  }
}
