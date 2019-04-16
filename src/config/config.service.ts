import 'dotenv/config';
import * as Joi from 'joi';
import { IConfigData } from './config.interface';

export class ConfigService {
  private vars: IConfigData;

  constructor() {
    const data: IConfigData = {
      // Application
      NODE_ENV: process.env.NODE_ENV,
      DEBUG: Boolean(process.env.DEBUG) || false,
      PORT: Number(process.env.PORT) || 8000,
      HOST: process.env.HOST || '0.0.0.0',
      // Database
      DATABASE_TYPE: process.env.DATABASE_TYPE || 'mysql',
      DATABASE_URL: process.env.DATABASE_URL || undefined,
      // Cache
      REDIS_URL: process.env.REDIS_URL,
      REDIS_TTL: Number(process.env.REDIS_TTL) || 5,
      REDIS_MAX: Number(process.env.REDIS_MAX) || 10,
    };

    this.vars = this.validateInput(data as IConfigData);
  }

  private validateInput(config: IConfigData): IConfigData {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      DEBUG: Joi.boolean()
        .default(false)
        .required(),
      PORT: Joi.number().default(8000),
      HOST: Joi.string()
        .default('0.0.0.0')
        .required(),
      DATABASE_TYPE: Joi.string()
        .default('mysql')
        .required(),
      DATABASE_URL: Joi.string().required(),
      REDIS_URL: Joi.string(),
      REDIS_TTL: Joi.number(),
      REDIS_MAX: Joi.number(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      config,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  read(): IConfigData {
    return this.vars;
  }

  get(key: string): string {
    return this.vars[key];
  }

  isDev(): boolean {
    return this.vars.NODE_ENV === 'dev' || this.vars.NODE_ENV === 'development';
  }

  isProd(): boolean {
    return this.vars.NODE_ENV === 'prod' || this.vars.NODE_ENV === 'production';
  }
}
