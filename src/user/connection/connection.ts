import { Injectable } from '@nestjs/common';

export class Connection {
  getName(): string {
    return ""
  } 
}

@Injectable()
export class MYSQLConnection extends Connection {
  getName(): string {
    return 'MYSQL'
  }
}

@Injectable()
export class MongoDBConnection extends Connection {
  getName(): string {
    return 'MongoDB'
  }
}