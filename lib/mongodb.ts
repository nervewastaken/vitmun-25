import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const uri: string = process.env.MONGODB_URI;

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient>;

declare global {
  // Extend the global scope with _mongoClientPromise
  let _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // Use a global variable in development to prevent creating multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client instance
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;