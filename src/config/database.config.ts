import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'learn',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['src/migrations/*.ts'],
  synchronize: true, // enable only in development
};
