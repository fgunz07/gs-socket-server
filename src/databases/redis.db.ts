import Redis from 'ioredis';

const REDIS_HOST = (process.env.REDIS_HOST || 'localhost') as string;
const REDIS_PORT = (process.env.REDIS_PORT || 6379) as number;

const redis = (): Redis => {
  const redis = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
    // username: REDIS_USER,
    // password: REDIS_PASS,
    // db: ""
  });

  redis.on('ready', () => {
    console.log(`Redis connection is ready.`);
  });

  redis.on('error', (error) => {
    console.log(`Error: ${error}`);
  });

  return redis;
};

export default redis;
