import * as dotenv from 'dotenv'
dotenv.config()

export const APP = {
  PORT: Number(process.env.APP_PORT) || 4010,
  NODE_ENV: process.env.NODE_ENV || 'local',
  CORES_ENABLED: process.env.CORES_ENABLED || false,
  DOMAIN: process.env.APP_DOMAIN || 'localhost'
}
export const DB = {
  HOST_URL: process.env.DB_HOST_URL || 'mongodb://localhost:27017/'
}
export const MAGIC = {
  SECRET_KEY: process.env.MAGIC_SECRET_KEY || '12345'
}

export const EMAIL = {
  HOST: process.env.EMAIL_HOST || 'smtp.gMAIL.com',
  PORT: Number(process.env.EMAIL_PORT) || 587,
  USERNAME: process.env.EMAIL_USERNAME || '',
  PASSWORD: process.env.EMAIL_PASSWORD || '',
  FROM: process.env.EMAIL_FROM || ''
}

export const JWT = {
  SECRET: process.env.JWT_SECRET || 'hard!to-guess_secret',
  EMAIL_SECRET: process.env.JWT_EMAIL_SECRET || 'hard!to-guess_secret',
  EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '1h',
  REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '1d'
}

export const REDIS = {
  HOST: process.env.REDIS_HOST || 'localhost',
  PORT: Number(process.env.REDIS_PORT) || 6379,
  PASSWORD: process.env.REDIS_PASSWORD || '0DHILQcN7InfdCKnUYdFazZn'
}
