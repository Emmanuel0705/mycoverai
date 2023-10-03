import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from '@app/modules/user/user.module';
import { DatabaseModule } from '@app/database/database.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { config } from 'dotenv';

config();

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: 587,
        auth: {
          user: process.env.EMAIL_ID, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        },
      },
      defaults: {
        from: process.env.EMAIL_SENDER_ID,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
