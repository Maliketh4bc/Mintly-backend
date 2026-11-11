import 'dotenv/config';

const required = (v: string | undefined, k: string) => {
  if (!v) throw new Error(`Falta variable de entorno: ${k}`);
  return v;
};

export const env = {
  PORT: Number(process.env.PORT ?? 3000),
  DATABASE_URL: required(process.env.DATABASE_URL, 'DATABASE_URL'),
  JWT_SECRET: required(process.env.JWT_SECRET, 'JWT_SECRET'),
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS ?? 10),
};