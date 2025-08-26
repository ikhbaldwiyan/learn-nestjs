import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, MongoDBConnection } from './connection/connection';

@Module({
  controllers: [UserController],
  providers: [UserService, {
    provide: Connection,
    useClass: MongoDBConnection
  }]
})
export class UserModule {}
