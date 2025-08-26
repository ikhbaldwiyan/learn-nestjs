import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class Connection {
  getName(): string {
    return 'jhon doe';
  }
}

@Injectable()
export class MYSQLConnection extends Connection {
  getName(): string {
    return 'MYSQL';
  }
}

@Injectable()
export class MongoDBConnection extends Connection {
  getName(): string {
    return 'MongoDB';
  }
}

export function createConnection(configService: ConfigService): Connection {
  if (configService.get('DATABASE') === 'mysql') {
    return new MYSQLConnection();
  } else {
    return new MongoDBConnection();
  }
}
