export interface IConfigData {
  // application
  NODE_ENV: string;
  DEBUG: boolean;
  PORT?: number;
  HOST?: string;
  // database
  DATABASE_TYPE: 'mysql' | string;
  DATABASE_URL: string;
  // Redis
  REDIS_URL: string;
  REDIS_TTL?: number;
  REDIS_MAX?: number;
}
