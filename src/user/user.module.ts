import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, MongoDBConnection } from './connection/connection';
import { mailService, MailService } from './mail/mail.service';
import { createUserRepository, UserRepository } from './user-repository/user-repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Connection,
      useClass: MongoDBConnection,
    },
    {
      provide: MailService,
      useValue: mailService
    },
    {
      provide: "EmailService",
      useExisting: MailService
    },
    {
      provide: UserRepository,
      useFactory: createUserRepository,
      inject: [Connection], 
    },
  ],
})
export class UserModule {}
