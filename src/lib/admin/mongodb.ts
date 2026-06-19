import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? 'socialchat';

let clientPromise: Promise<MongoClient> | undefined;

declare global {
  var __apiDocsMongoClientPromise: Promise<MongoClient> | undefined;
}

export function getMongoClient() {
  if (!uri) throw new Error('MONGODB_URI is not configured');

  if (process.env.NODE_ENV === 'development') {
    globalThis.__apiDocsMongoClientPromise ??= new MongoClient(uri).connect();
    return globalThis.__apiDocsMongoClientPromise;
  }

  clientPromise ??= new MongoClient(uri).connect();
  return clientPromise;
}

export async function getMongoDb() {
  const client = await getMongoClient();
  return client.db(dbName);
}
