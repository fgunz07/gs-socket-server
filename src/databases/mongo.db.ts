import { MongoClient } from 'mongodb';

const MONGO_HOST = (process.env.MONGO_DBNAME || 'localhost') as string;
const MONGO_PORT = (process.env.MONGO_PORT || 27017) as number;
export const MONGO_DBNAME = (process.env.MONGO_DBNAME || 's-adapter') as string;
export const MONGO_USER = (process.env.MONGO_USER || 'root') as string;
export const MONGO_PASS = (process.env.MONGO_PASS || 'admin123') as string;
export const MONGO_COLLECTION = (process.env.MONGO_COLLECTION ||
  'socket.io-adapter-events') as string;

const mongo = async (): Promise<MongoClient | undefined> => {
  let mongoClient;

  try {
    mongoClient = new MongoClient(
      `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/`
    );

    await mongoClient.connect();

    return mongoClient;
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
};

export default mongo;
