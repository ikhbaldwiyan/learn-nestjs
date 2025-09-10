import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'learn',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ["dist/migrations/*{.ts,.js}"],
  synchronize: false, // enable only in development
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

void dataSource.initialize();