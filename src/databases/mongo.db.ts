import { MongoClient } from 'mongodb';

const MONGO_HOST = (process.env.MONGO_DBNAME || 'localhost') as string;
export const MONGO_DBNAME = (process.env.MONGO_DBNAME || 's-adapter') as string;
export const MONGO_COLLECTION = (process.env.MONGO_COLLECTION ||
  'socket.io-adapter-events') as string;

const mongo = async (): Promise<MongoClient | undefined> => {
  let mongoClient;

  try {
    mongoClient = new MongoClient(MONGO_HOST);

    await mongoClient.connect();
    console.log('MongoDB connected');

    return mongoClient;
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
};

export default mongo;
