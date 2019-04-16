import { Module, DynamicModule, CacheModule, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as appRootPath from 'app-root-path';
import * as path from 'path';
import { parseUri } from 'mysql-parse';
import * as redisStore from 'cache-manager-redis-store';

import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';
import { DatesSubscriber } from '../subscribers/dates.subscriber';

export function getOrmConfig() {
  const config = new ConfigService().read();

  const mysqlConfig = parseUri(config.DATABASE_URL);
  return {
    type: config.DATABASE_TYPE || 'mysql',
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    username: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
    entities: [
      `${path.join(appRootPath.path, '{src,dist}')}/**/*.entity{.ts,.js}`,
    ],
    subscribers: [DatesSubscriber],
    synchronize: false,
    timezone: 'UTC',
    dateStrings: 'TIMESTAMP',
  };
}

export function getCacheConfig() {
  const config = new ConfigService().read();
  const redisConfig = parseUri(config.REDIS_URL);

  return {
    store: redisStore,
    db: redisConfig.database,
    host: redisConfig.host,
    port: redisConfig.port,
    auth_pass: redisConfig.password,
    ttl: config.REDIS_TTL,
    max: config.REDIS_MAX,
  };
}

@Module({
  imports: [ConfigModule],
  exports: [DatabaseModule],
})
export class DatabaseModule {
  static orm(): DynamicModule {
    const ormConfig: any = getOrmConfig();
    return {
      module: DatabaseModule,
      imports: [TypeOrmModule.forRoot(ormConfig)],
      exports: [DatabaseModule],
    };
  }

  static cache(): DynamicModule {
    const cacheConfig: any = getCacheConfig();

    return {
      module: DatabaseModule,
      imports: [CacheModule.register(cacheConfig)],
      exports: [DatabaseModule],
    };
  }
}
