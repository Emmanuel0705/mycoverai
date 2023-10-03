import { DatabaseModule } from '@app/database/database.module';
import { userProviders } from '@app/database/models/user.model';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...userProviders],
})
export class UserModule {}
