// src/data-source.ts
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './config/database.config';

export const AppDataSource = new DataSource(dataSourceOptions);
