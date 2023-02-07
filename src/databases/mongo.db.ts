import { MongoClient } from 'mongodb';

const MONGO_HOST = (process.env.MONGO_HOST ||
  'mongodb://root:admin123@localhost:27017') as string;
export const MONGO_DBNAME = (process.env.MONGO_DBNAME || 's-adapter') as string;
export const MONGO_COLLECTION = (process.env.MONGO_COLLECTION ||
  'socket.io-adapter-events') as string;

const mongo = async (): Promise<MongoClient> => {
  console.log('mongoose connected');
  return await new MongoClient(`${MONGO_HOST}`).connect();
};

export default mongo;
